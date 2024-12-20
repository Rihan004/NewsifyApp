# Newsify - A Social News Platform for Trusted News Reporting

**Newsify** is a dynamic web application designed to empower users to become news reporters, post news content, and engage in verifying the truthfulness of news through community feedback. The project was built to address the increasing concerns around misinformation and fake news, aiming to make news consumption more transparent and trustworthy.

## Project Overview:

The core functionality of **Newsify** allows users to:

- **Create Accounts**: Users can sign up and create profiles, with an option to upload profile pictures and provide biographical information.
- **Post News**: Once logged in, users can post news articles, including text, images, and videos, making it a multimedia platform for diverse content.
- **Engage with News**: Other users can interact with posted news by marking it as true or false, providing valuable insights into the credibility of the news, and building a trustworthy community of readers and reporters.
- **Comment & Discuss**: Users can also leave comments on posts, sharing their opinions, and engaging in discussions about the news articles.
- **Follow and Connect**: **Newsify** offers a social aspect, where users can follow each other, discover relevant content, and stay updated on the latest posts.
  ![Screenshot 2024-11-23 234626](https://github.com/user-attachments/assets/8c2eaa1a-37e3-40f1-8d7c-56644f377701)
  ![Screenshot 2024-11-23 235955](https://github.com/user-attachments/assets/5d9441f6-f87e-4295-90f6-07825475f460)
  ![Screenshot 2024-11-24 000139](https://github.com/user-attachments/assets/90ac25d1-8f91-4741-b37b-8fa0d5cc50e2)
  ![Screenshot 2024-11-23 235248](https://github.com/user-attachments/assets/a4eae838-16fb-46ec-890d-98c4218f3090)
  ![Screenshot 2024-11-23 235501](https://github.com/user-attachments/assets/4f9c639d-5fe9-4a1b-ba38-6167404d4252)

## Technologies Used:

- **Frontend**: The frontend is powered by **EJS (Embedded JavaScript)**, allowing dynamic rendering of pages, providing a responsive and interactive experience. **Tailwind CSS** was used for styling, ensuring a modern, clean, and responsive user interface.
- **Backend**: The backend is built with **Node.js** and **Express.js**, offering a scalable and fast server to handle multiple user requests and real-time interactions.
- **Database**: Data is stored using **MongoDB**, an efficient NoSQL database that allows flexible and scalable data storage for user profiles, posts, comments, and more.
- **Authentication**: **JWT (JSON Web Tokens)** is used for authentication, ensuring secure access to user accounts and protected routes. Passwords are securely hashed using **bcrypt**.
- **Image & Video Handling**: Users can upload profile images and post multimedia content (images/videos), stored as Buffers in MongoDB, with handling for media display.
- **Community Engagement**: The app includes options for users to like, dislike, and comment on posts, creating an interactive and community-driven platform for news validation.

## Future Improvements:

- **Enhanced News Validation**: Add more advanced tools to help users assess the validity of news, such as AI-driven fact-checking or integration with external news verification services.
- **Real-time Notifications**: Implement notifications to keep users updated when new posts, comments, or interactions occur.
- **Mobile Optimization**: Further improve the app’s responsiveness and usability on mobile devices for a better user experience.

## Conclusion:

**Newsify** represents a step towards building a more accountable and transparent news environment, where users can actively participate in verifying the news they consume. The development process was an exciting journey of learning and applying new web technologies, solving real-world problems, and creating an engaging platform that empowers users to make informed decisions about the news they read.

---

### How to Run Locally:

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/newsify.git](https://github.com/Rihan004/NewsifyApp)

2. cd newsify
   npm install
3. Set up the .env file for environment variables (e.g., MongoDB connection, JWT secret).
4. Run the development server:
   npm start
5. http://localhost:3000 or any port you choose

