export function orderDTO(user, products) {
    const date = new Date().toLocaleString();
  
    return {
        timestamp: date,
        user: {
          username: user.username,
          email: user.email,
          address: user.address,
          age: user.age,
          phone: user.phone_number,
          cartID: user.cartID,
          userID: user._id,
        },
        products: products,
    }
}