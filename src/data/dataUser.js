const users = [
  {
    id: 1,
    name: "Admin",
    email: "admin@example.com",
    password: "123456",
    role: "admin",
  },
  {
    id: 2,
    name: "Người Dùng",
    email: "member2@example.com",
    password: "123456",
    role: "user",
  },
  {
    id: 3,
    name: "Khách Hàng",
    email: "customer@example.com",
    password: "customer123",
    role: "customer",
  },
];

export const authenticateUser = (email, password) => {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    // Không trả về mật khẩu cho client
    const { password, ...userWithoutPassword } = user;
    return {
      success: true,
      user: userWithoutPassword,
    };
  }
  return {
    success: false,
    message: "Email hoặc mật khẩu không đúng!",
  };
};

export default users;
