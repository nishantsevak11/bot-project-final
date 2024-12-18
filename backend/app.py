from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from models.product import Product
from extensions import db
import re
from fuzzywuzzy import fuzz
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import nltk
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Download NLTK data
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('punkt')
    nltk.download('stopwords')

def create_app():
    app = Flask(__name__, static_folder='static')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(app)
    db.init_app(app)

    with app.app_context():
        try:
            db.create_all()
            logger.info("Database tables created successfully")
        except Exception as e:
            logger.error(f"Error creating database tables: {str(e)}")

    return app

app = create_app()

# Helper functions for advanced text processing
def preprocess_text(text):
    """Clean and normalize text input"""
    try:
        # Convert to lowercase and remove special characters
        text = re.sub(r'[^\w\s]', '', text.lower())
        # Remove extra whitespace
        text = ' '.join(text.split())
        return text
    except Exception as e:
        logger.error(f"Error in preprocess_text: {str(e)}")
        return text.lower()

def extract_product_query(text):
    """Extract product-related terms from user input"""
    try:
        # Tokenize and remove stopwords
        stop_words = set(stopwords.words('english'))
        tokens = word_tokenize(text.lower())
        product_terms = [word for word in tokens if word not in stop_words]
        return ' '.join(product_terms)
    except Exception as e:
        logger.error(f"Error in extract_product_query: {str(e)}")
        return text

def fuzzy_match_products(query, threshold=70):
    """Find products using fuzzy matching"""
    try:
        products = Product.query.all()
        matches = []

        for product in products:
            # Check name similarity
            name_ratio = fuzz.partial_ratio(query, product.name.lower())
            # Check category similarity
            category_ratio = fuzz.partial_ratio(query, product.category.lower())
            # Check description similarity
            desc_ratio = fuzz.partial_ratio(query, product.description.lower())

            # Use the highest matching score
            max_ratio = max(name_ratio, category_ratio, desc_ratio)
            if max_ratio >= threshold:
                matches.append((product, max_ratio))

        # Sort by matching score
        matches.sort(key=lambda x: x[1], reverse=True)
        return [m[0] for m in matches]
    except Exception as e:
        logger.error(f"Error in fuzzy_match_products: {str(e)}")
        return []

def generate_response(user_message, products=None):
    """Generate contextual responses based on user input and product results"""
    try:
        # Greeting patterns
        greetings = ['hi', 'hello', 'hey', 'greetings']
        if any(greeting in user_message.lower() for greeting in greetings):
            return "Hello! How can I help you find products today?"

        # Help/guidance patterns
        help_patterns = ['help', 'how', 'what can you do', 'guide']
        if any(term in user_message.lower() for term in help_patterns):
            return ("I can help you find products! Try asking me things like:\n"
                    "- Show me iPhones\n"
                    "- Do you have any backpacks?\n"
                    "- I'm looking for furniture\n"
                    "- Show me sports equipment")

        # Handle product queries
        if products is not None:
            if len(products) == 0:
                suggestions = Product.query.with_entities(Product.category).distinct().all()
                categories = [cat[0] for cat in suggestions]
                return (f"I couldn't find exact matches for '{user_message}'. "
                       f"Try browsing our categories: {', '.join(categories)}. "
                       "Or try rephrasing your search with different terms.")

            product_count = len(products)
            if product_count == 1:
                return f"I found this {products[0].category} product for you:"
            else:
                return f"Here are {product_count} products that match your search:"

        # Handle price-related queries
        price_patterns = ['price', 'cost', 'how much', 'expensive', 'cheap']
        if any(term in user_message.lower() for term in price_patterns):
            return "I can help you find products in different price ranges. What type of product are you interested in?"

        # Handle availability queries
        stock_patterns = ['available', 'in stock', 'stock', 'when']
        if any(term in user_message.lower() for term in stock_patterns):
            return "I can check product availability for you. What specific product are you looking for?"

        # Handle thank you messages
        thanks_patterns = ['thank', 'thanks', 'appreciate']
        if any(term in user_message.lower() for term in thanks_patterns):
            return "You're welcome! Let me know if you need anything else."

        # Default response for unrecognized queries
        return ("I'm not sure what you're looking for. Try asking about specific products or categories, "
                "or say 'help' to see what I can do!")
    except Exception as e:
        logger.error(f"Error in generate_response: {str(e)}")
        return "I'm having trouble understanding your request. Please try asking in a different way."

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '').strip()

        if not user_message:
            return jsonify({
                'message': "I didn't catch that. Could you please say something?",
                'products': []
            })

        logger.info(f"Received message: {user_message}")

        # Process the user's message
        cleaned_message = preprocess_text(user_message)
        product_query = extract_product_query(cleaned_message)

        # Find matching products using fuzzy matching
        products = fuzzy_match_products(product_query)

        # Generate appropriate response
        response = generate_response(user_message, products)

        # Convert products to dictionary format
        products_dict = [{
            'name': p.name,
            'category': p.category,
            'price': p.price,
            'description': p.description,
            'quantity_in_stock': p.quantity_in_stock
        } for p in products]

        logger.info(f"Sending response: {response}")
        logger.info(f"Found {len(products_dict)} products")

        return jsonify({
            'message': response,
            'products': products_dict
        })

    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        return jsonify({
            'message': "I'm having trouble processing your request. Please try again or rephrase your question.",
            'products': []
        }), 500

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    # Initialize database with products if empty
    from init_db import init_db
    with app.app_context():
        init_db()
    app.run(debug=True, port=5000)
