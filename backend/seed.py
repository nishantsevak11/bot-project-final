from app import create_app
from extensions import db
from models.product import Product

def seed_products():
    products = [
        {
            'name': 'HD Smart Watch',
            'category': 'jewelry & watches',
            'price': 809.51,
            'description': 'Comfortable and stylish for everyday use. Features HD technology, available in Orange',
            'quantity_in_stock': 406
        },
        {
            'name': 'Gluten-Free Smart Watch',
            'category': 'jewelry & watches',
            'price': 2816.47,
            'description': 'Comfortable and stylish for everyday use. Features Gluten-Free technology, available in Silver',
            'quantity_in_stock': 62
        },
        {
            'name': 'Premium Adjustable Watch',
            'category': 'accessories',
            'price': 2863.89,
            'description': 'Made with premium materials. Features Adjustable technology, available in Beige',
            'quantity_in_stock': 140
        },
        {
            'name': 'Samsung Galaxy S21',
            'category': 'electronics',
            'price': 999.99,
            'description': 'Latest Samsung flagship phone with amazing camera',
            'quantity_in_stock': 50
        },
        {
            'name': 'iPhone 13 Pro',
            'category': 'electronics',
            'price': 1099.99,
            'description': 'Apple flagship phone with pro camera system',
            'quantity_in_stock': 75
        }
    ]

    # Clear existing products
    Product.query.delete()

    # Add new products
    for product_data in products:
        product = Product(**product_data)
        db.session.add(product)

    db.session.commit()
    print("Products seeded successfully!")

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        seed_products()
