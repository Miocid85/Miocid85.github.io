export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  user: {
    name: string;
    surname: string;
    patronymic: string;
    email: string;
    phone: string;
    sector: string;
  };
  items: OrderItem[];
  totalAmount: number;
  orderDate: string;
}

export const sendOrderNotification = async (order: Order) => {
  try {
    // Simulate sending email to sales manager
    console.log('📧 Sending order notification to sales manager...');
    
    // In a real implementation, you would send this to your backend API
    // which would then send emails using services like SendGrid, Mailgun, etc.
    
    const managerEmail = {
      to: 'sales@kubsantechopt.ru', // Replace with actual manager email
      subject: `Новый заказ #${order.id}`,
      body: `
        Получен новый заказ!
        
        Номер заказа: ${order.id}
        Дата: ${order.orderDate}
        
        Клиент:
        Имя: ${order.user.surname} ${order.user.name} ${order.user.patronymic}
        Email: ${order.user.email}
        Телефон: ${order.user.phone}
        Сектор: ${order.user.sector}
        
        Товары:
        ${order.items.map(item => 
          `- ${item.name} (${item.quantity} шт.) - ${item.price.toLocaleString('ru-RU')} ₽`
        ).join('\n')}
        
        Общая сумма: ${order.totalAmount.toLocaleString('ru-RU')} ₽
        
        Пожалуйста, свяжитесь с клиентом как можно скорее.
      `
    };

    // Simulate sending confirmation email to customer
    console.log('📧 Sending confirmation email to customer...');
    
    const customerEmail = {
      to: order.user.email,
      subject: `Заказ #${order.id} получен`,
      body: `
        Уважаемый ${order.user.surname} ${order.user.name} ${order.user.patronymic}!
        
        Спасибо за ваш заказ!
        
        Номер заказа: ${order.id}
        Дата заказа: ${order.orderDate}
        
        Товары:
        ${order.items.map(item => 
          `- ${item.name} (${item.quantity} шт.) - ${item.price.toLocaleString('ru-RU')} ₽`
        ).join('\n')}
        
        Общая сумма: ${order.totalAmount.toLocaleString('ru-RU')} ₽
        
        Наш менеджер свяжется с вами в ближайшее время для подтверждения заказа и уточнения деталей доставки.
        
        С уважением,
        Команда КубСантехОпт
      `
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('✅ Emails sent successfully!');
    
    return {
      success: true,
      managerEmail,
      customerEmail
    };
    
  } catch (error) {
    console.error('❌ Error sending emails:', error);
    throw new Error('Failed to send order notifications');
  }
};