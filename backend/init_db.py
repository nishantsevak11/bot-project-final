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
        'category': 'Electronics',
        'price': 999.99,
        'description': 'Latest iPhone with advanced camera system and A17 Pro chip',
        'quantity_in_stock': 50
    },
    {
        'name': 'iPhone 14',
        'category': 'Electronics',
        'price': 799.99,
        'description': 'Powerful iPhone with A15 Bionic chip and great camera',
        'quantity_in_stock': 75
    },
    {
        'name': 'Samsung Galaxy S23',
        'category': 'Electronics',
        'price': 899.99,
        'description': 'Premium Android smartphone with advanced features',
        'quantity_in_stock': 60
    },
    {
        'name': 'MacBook Pro',
        'category': 'Electronics',
        'price': 1299.99,
        'description': 'Powerful laptop for professionals',
        'quantity_in_stock': 40
    },
    {
        'name': 'AirPods Pro',
        'category': 'Electronics',
        'price': 249.99,
        'description': 'Premium wireless earbuds with noise cancellation',
        'quantity_in_stock': 100
    },
    # Clothing
    {
        'name': 'T-Shirt',
        'category': 'Clothing',
        'price': 19.99,
        'description': 'Comfortable cotton t-shirt',
        'quantity_in_stock': 200
    },
    {
        'name': 'Jeans',
        'category': 'Clothing',
        'price': 49.99,
        'description': 'Classic blue jeans',
        'quantity_in_stock': 150
    },
    {
        'name': 'Dress',
        'category': 'Clothing',
        'price': 79.99,
        'description': 'Elegant evening dress',
        'quantity_in_stock': 80
    },
    {
        'name': 'Jacket',
        'category': 'Clothing',
        'price': 89.99,
        'description': 'Stylish winter jacket',
        'quantity_in_stock': 70
    },
    # Furniture
    {
        'name': 'Sofa',
        'category': 'Furniture',
        'price': 699.99,
        'description': 'Comfortable 3-seater sofa',
        'quantity_in_stock': 20
    },
    {
        'name': 'Dining Table',
        'category': 'Furniture',
        'price': 399.99,
        'description': '6-seater dining table',
        'quantity_in_stock': 15
    },
    {
        'name': 'Bed',
        'category': 'Furniture',
        'price': 899.99,
        'description': 'Queen size bed with storage',
        'quantity_in_stock': 25
    },
    # Accessories
    {
        'name': 'Backpack',
        'category': 'Accessories',
        'price': 49.99,
        'description': 'Spacious and durable backpack',
        'quantity_in_stock': 100
    },
    {
        'name': 'Watch',
        'category': 'Accessories',
        'price': 199.99,
        'description': 'Elegant analog watch',
        'quantity_in_stock': 50
    }
]

def init_db():
    """Initialize the database with product data if it's empty."""
    try:
        # Create tables
        db.create_all()
        
        # Check if products exist
        if Product.query.count() == 0:
            logger.info("Initializing database with products...")
            
            # Add products
            for product_data in products:
                product = Product(**product_data)
                db.session.add(product)
            
            # Commit changes
            db.session.commit()
            logger.info(f"Added {len(products)} products to database")
        else:
            logger.info(f"Database already contains {Product.query.count()} products")
            
    except Exception as e:
        logger.error(f"Error initializing database: {str(e)}")
        raise

if __name__ == "__main__":
    init_db()
