# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# calm-companion

The purpose of the Calm Companion project is to create an app for anonymously sharing mental health stories, providing tools, and offering crisis support. The goal is to assist individuals in overcoming negative thoughts by conducting daily check-ins with themselves, and ensuring they do not feel alone in their journey to recovery. The app includes three main sections: a dashboard with a mood checkin and personalized coping strategies toolkit, a crisis support section, and an anonymous chat feature, allowing users to connect and share their experiences discreetly.

Built With:
This section lists the major frameworks/libraries used to build this project.

- React, Firebase

## Getting Started:

To get a local copy up and running follow these simple example steps.

1. Clone the repo
   git clone https://github.com/gracigraz/calm-companion.git
2. Install NPM packages
   npm install

## Usage

This section shows examples of how the project can be used. Additional screenshots, code examples and demos work well in this space and links to more resources.
#Firebase Firestore

## Features

1. Welcome Page:

A welcoming screen that introduces users to the app with a brief "About Us" paragraph.
Offers the options to either "Login" or "Join Now."

2. Authentication:

User authentication system to ensure secure access to the app.
Users can log in using their Google account or by providing their email and password.
New users can sign up by tapping "Join Now," where they need to fill out their name, last name, email, password, and create an account.
After creating an account, users are redirected to the login page, where they can sign in with Google, their email and password, or the newly created account.

3. Navigation Menu:

A navigation menu for easy access to various sections of the app: home/dashboard, crisis support and chat. 4. Home/Dashboard:

The central dashboard where users can access key features and functionalities.
Includes a mood check-in feature.
Provides access to a personalized coping strategies toolkit.
The toolkit includes 4 sections where the user can add/delete/update their prefered coping strategies in times of crisis, their go to contacts and places were their are able to disconnect from the negative thought etc and a gratitude sectioin with inspiration and opportunity for the user to add reasons to live to motivate him for the day

4. Home/dashboard

The central dashboard serves as the hub where users can access key features and functionalities of the app.
Key Features:

4.1 Mood Check-in Feature:

Allows users to perform mood check-ins, helping them monitor and reflect on their emotional well-being.

4.2 Personalized Coping Strategies Toolkit:

Includes a toolkit for users to manage and improve their mental health.

4.2.2 Keep-Calm Hacks:

Provides users with a selection of inspirational hacks and coping strategies that they can choose from to remind themselves.
Allows users to add their own personalized hacks and strategies.
Offers the option to delete strategies that no longer serve them.

4.2.2 Grounds for Gratitude:

Provides a space where users can add reasons for living and finding joy in life.
Offers inspiration to help users find gratitude and remind themselves that life is good.
The user can add their own too.

4.2.3 Close Companions:

A section where users can list and store contact information for close friends, partners, and healthcare providers who they want to keep easily accessible in case of a crisis. They can also delete the contact information if it no longer serves them.

4.2.4 Diversion Spots:

Allows users to create a list of places or activities that help them divert their thoughts, disengage from negative behaviors, or find solace.
Users can personalize this section with their preferred diversion spots.

The Home/Dashboard feature provides a comprehensive and personalized toolkit for users to manage their mental health, find inspiration, and maintain connections with their support network. It serves as a central hub for accessing these critical tools/resources.

5. Crisis Section:

A dedicated section designed to provide immediate crisis support to users during challenging times.
Contains a comprehensive set of resources and information aimed at helping individuals navigate difficult situations.
Key Features:

Emergency Calling:

Enables users to initiate direct calls to emergency services, including 911 and the National Suicide Prevention Lifeline (988), providing rapid assistance during emergencies.

Location-Based Services:

Utilizes location data (Mapbox API) to find nearby urgent care and emergency room facilities, enhancing accessibility in critical situations.

Interactive Maps:

Displays emergency rooms on an interactive map, offering a visual representation of nearby facilities for quick and informed decision-making.

Urgent Care Listings:

Lists nearby urgent care facilities on a dedicated page, ensuring users have access to appropriate care options.
Includes a button to open Google Maps, simplifying the process of finding and navigating to the chosen urgent care facility.

This Crisis Section serves as a vital resource for users, providing both immediate assistance through emergency calling and valuable information to connect individuals with appropriate care facilities during challenging times.

6. Chat:

An anonymous chat feature that ensures user privacy and confidentiality.
Users have the option to choose their own nickname and emoji, allowing them to maintain anonymity while engaging in conversations.
The choice of nickname and emoji can be changed as frequently as desired during the conversation.
Users can connect and communicate with others anonymously, fostering a safe and open environment for discussions.
Specific chat rooms are available, allowing users to join conversations with individuals from the same group or topic.
The chat feature enables users to participate in multiple concurrent conversations without interference, ensuring seamless communication.

## Contact

Graciela Manzanares - gracielamanzsousa@gmail.com

## Project Link: https://github.com/gracigraz/calm-companion.git
