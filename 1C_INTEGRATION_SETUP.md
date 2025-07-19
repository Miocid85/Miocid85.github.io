# 1C Integration Setup Guide

This guide explains how to integrate your React website with 1C:Enterprise for real-time product management, inventory tracking, and order processing.

## Prerequisites

- 1C:Enterprise 8.3 or higher
- 1C:Enterprise Web Services enabled
- Network access between your web server and 1C server

## Configuration

### 1. Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# 1C Integration Configuration
REACT_APP_1C_BASE_URL=http://your-1c-server:port
REACT_APP_1C_API_KEY=your-api-key-here

# Optional: 1C Web Service Configuration
REACT_APP_1C_WS_URL=http://your-1c-server:port/your-database/ws/your-service
REACT_APP_1C_WS_USERNAME=your-username
REACT_APP_1C_WS_PASSWORD=your-password

# Development Settings
REACT_APP_ENABLE_1C_MOCK=true
REACT_APP_1C_TIMEOUT=30000
```

### 2. 1C Server Setup

#### Option A: REST API (Recommended)

1. **Enable HTTP Service in 1C:**
   - Open 1C:Enterprise Administration Console
   - Go to "Infobases" → Your database → "Web Services"
   - Create a new web service for your external API

2. **Configure API Endpoints:**
   ```1c
   // Example 1C code for web service
   Функция ПолучитьТовары(Категория = "", Лимит = 0) Экспорт
       Запрос = Новый Запрос;
       Запрос.Текст = "ВЫБРАТЬ
       |   Товары.Ссылка КАК id,
       |   Товары.Наименование КАК name,
       |   Товары.Описание КАК description,
       |   Товары.ЦенаПродажи КАК price,
       |   Товары.Остаток КАК stock,
       |   Товары.Категория КАК category
       |ИЗ
       |   Справочник.Товары КАК Товары
       |ГДЕ
       |   Товары.Категория = &Категория
       |   И Товары.Остаток > 0";
       
       Запрос.УстановитьПараметр("Категория", Категория);
       
       Результат = Запрос.Выполнить();
       Возврат Результат.Выгрузить();
   КонецФункции
   ```

#### Option B: Web Services (SOAP)

1. **Create Web Service in 1C:**
   - Define service methods for products, orders, customers
   - Configure authentication and security

2. **Generate WSDL:**
   - Access your web service WSDL at: `http://your-server:port/your-db/ws/your-service?wsdl`

## API Endpoints

The integration expects the following REST API endpoints:

### Products
- `GET /products` - Get all products (with optional category filter)
- `GET /products/{id}` - Get specific product
- `GET /products/{id}/stock` - Get product stock level

### Orders
- `POST /orders` - Create new order
- `GET /orders/{id}` - Get order details
- `PUT /orders/{id}/status` - Update order status

### Customers
- `POST /customers` - Create new customer
- `GET /customers/{id}` - Get customer details
- `GET /customers/search?email={email}` - Find customer by email

### Inventory
- `PUT /products/{id}/stock` - Update product stock

### Categories
- `GET /categories` - Get all product categories

## Features Implemented

### 1. Real-time Product Management
- Products are fetched from 1C in real-time
- Stock levels are displayed and updated automatically
- Category filtering works with 1C data

### 2. Customer Management
- Contact form creates customers in 1C
- Customer data is synchronized between website and 1C
- Duplicate customer detection

### 3. Order Processing
- Orders created on website are sent to 1C
- Order status tracking
- Inventory updates when orders are placed

### 4. Inventory Tracking
- Real-time stock levels
- Out-of-stock product handling
- Automatic stock updates

## Testing

### Mock Mode
For development, you can enable mock mode by setting:
```env
REACT_APP_ENABLE_1C_MOCK=true
```

This will use mock data instead of connecting to 1C.

### Testing Endpoints
Use tools like Postman or curl to test your 1C API endpoints:

```bash
# Test products endpoint
curl -X GET "http://your-1c-server:port/products" \
  -H "Authorization: Bearer your-api-key"

# Test order creation
curl -X POST "http://your-1c-server:port/orders" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{
    "customerName": "Test Customer",
    "customerEmail": "test@example.com",
    "customerPhone": "+7(999)123-45-67",
    "items": [
      {
        "productId": "123",
        "quantity": 2,
        "price": 1000,
        "total": 2000
      }
    ],
    "totalAmount": 2000
  }'
```

## Security Considerations

1. **API Authentication:**
   - Use Bearer tokens for API authentication
   - Implement rate limiting
   - Use HTTPS for all communications

2. **Data Validation:**
   - Validate all input data on both client and server
   - Sanitize data before sending to 1C
   - Implement proper error handling

3. **Access Control:**
   - Limit API access to necessary endpoints only
   - Implement proper user roles and permissions
   - Log all API access for audit purposes

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Configure CORS settings in 1C web service
   - Ensure proper headers are set

2. **Authentication Failures:**
   - Verify API key is correct
   - Check 1C user permissions
   - Ensure HTTPS is used for production

3. **Data Synchronization Issues:**
   - Check network connectivity
   - Verify 1C service is running
   - Review error logs in both systems

### Debug Mode
Enable debug logging by setting:
```env
REACT_APP_DEBUG_1C=true
```

This will log all API requests and responses to the browser console.

## Performance Optimization

1. **Caching:**
   - Implement client-side caching for product data
   - Use React Query or SWR for data fetching
   - Cache categories and static data

2. **Pagination:**
   - Implement pagination for large product lists
   - Use infinite scroll for better UX

3. **Real-time Updates:**
   - Consider WebSocket connections for real-time stock updates
   - Implement polling for critical data changes

## Support

For technical support with 1C integration:
- Check 1C:Enterprise documentation
- Review web service configuration
- Test API endpoints independently
- Monitor server logs for errors 