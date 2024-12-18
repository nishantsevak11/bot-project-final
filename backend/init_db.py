from app import create_app
from models.product import Product
from extensions import db
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Product data
products = [
    # Electronics
    {
        'name': 'iPhone 15 Pro',
        'category': 'electronics',
        'price': 999.99,
        'description': 'Latest iPhone with advanced camera system and A17 Pro chip',
        'quantity_in_stock': 50
    },
    {
        'name': 'iPhone 14',
        'category': 'electronics',
        'price': 799.99,
        'description': 'Powerful iPhone with A15 Bionic chip and great camera',
        'quantity_in_stock': 75
    },
    # Accessories
    {
        'name': 'Backpack',
        'category': 'accessories',
        'price': 49.99,
        'description': 'Spacious and durable backpack for everyday use',
        'quantity_in_stock': 100
    },
    {
        'name': 'Watch',
        'category': 'accessories',
        'price': 199.99,
        'description': 'Elegant analog watch with leather strap',
        'quantity_in_stock': 30
    },
    {
        'name': 'Sunglasses',
        'category': 'accessories',
        'price': 129.99,
        'description': 'UV protection sunglasses with polarized lenses',
        'quantity_in_stock': 45
    },
    # Clothing
    {
        'name': 'T-Shirt',
        'category': 'clothing',
        'price': 24.99,
        'description': 'Cotton crew neck t-shirt',
        'quantity_in_stock': 200
    },
    {
        'name': 'Jeans',
        'category': 'clothing',
        'price': 59.99,
        'description': 'Classic fit denim jeans',
        'quantity_in_stock': 150
    },
    {
        'name': 'Dress',
        'category': 'clothing',
        'price': 79.99,
        'description': 'Elegant casual dress',
        'quantity_in_stock': 80
    },
    # Home Appliances
    {
        'name': 'Washing Machine',
        'category': 'appliances',
        'price': 499.99,
        'description': 'Front load washing machine with multiple programs',
        'quantity_in_stock': 20
    },
    {
        'name': 'Refrigerator',
        'category': 'appliances',
        'price': 899.99,
        'description': 'Double door refrigerator with frost-free technology',
        'quantity_in_stock': 15
    },
    # Furniture
    {
        'name': 'Sofa',
        'category': 'furniture',
        'price': 799.99,
        'description': 'Comfortable 3-seater sofa',
        'quantity_in_stock': 10
    },
    {
        'name': 'Dining Table',
        'category': 'furniture',
        'price': 599.99,
        'description': '6-seater dining table set',
        'quantity_in_stock': 8
    },
    # Beauty Products
    {
        'name': 'Shampoo',
        'category': 'beauty',
        'price': 14.99,
        'description': 'Nourishing shampoo for all hair types',
        'quantity_in_stock': 300
    },
    {
        'name': 'Face Cream',
        'category': 'beauty',
        'price': 29.99,
        'description': 'Hydrating face cream with SPF protection',
        'quantity_in_stock': 250
    },
    # Sports
    {
        'name': 'Yoga Mat',
        'category': 'sports',
        'price': 39.99,
        'description': 'Non-slip yoga mat with carrying strap',
        'quantity_in_stock': 120
    },
    {
        'name': 'Dumbbells',
        'category': 'sports',
        'price': 49.99,
        'description': 'Set of adjustable dumbbells',
        'quantity_in_stock': 80
    }
]

def init_db():
    """Initialize the database with product data if it's empty."""
    try:
        app = create_app()
        with app.app_context():
            # Check if database is empty
            if Product.query.first() is None:
                logger.info("Initializing database with product data...")
                for product_data in products:
                    try:
                        product = Product(**product_data)
                        db.session.add(product)
                        logger.info(f"Added product: {product_data['name']}")
                    except Exception as e:
                        logger.error(f"Error adding product {product_data['name']}: {str(e)}")
                        db.session.rollback()
                        continue
                try:
                    db.session.commit()
                    logger.info("Database initialized successfully!")
                except Exception as e:
                    logger.error(f"Error committing to database: {str(e)}")
                    db.session.rollback()
            else:
                logger.info("Database already contains products. Skipping initialization.")
    except Exception as e:
        logger.error(f"Error in init_db: {str(e)}")

if __name__ == "__main__":
    init_db()
