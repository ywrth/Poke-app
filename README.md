# POKEDEX APP 

This is a JavaScript web application built with HTML, CSS, and JavaScript that utilizes an external API to load and display data. It provides a user interface to search and display a list of Pokémon.

## User Goals

The primary goal of this application is to provide users with a way to view a list of Pokemons  and access detailed information about each of them. 

## Getting Started

To run this application locally, follow these steps:

1. Clone the repository or download the source code.

2. Open the index.html file in your preferred web browser.

## Dependencies

This application relies on the following dependencies:

- Bootstrap: A popular CSS framework for building responsive and mobile-first websites.
- jQuery: A fast and feature-rich JavaScript library.
- Popper.js: A library used for managing popovers, tooltips, and other UI elements.
- promise-polyfill: A JavaScript polyfill for the Promise object.
- fetch-polyfill: A polyfill that provides the fetch API for making HTTP requests.

Please ensure you have an internet connection to load the required CSS and JavaScript files from their respective CDNs.

## File Structure

The important files and directories in this project are as follows:

- index.html: The main HTML file that defines the structure and layout of the application.
- dist/styles.css: The minified CSS file that contains the custom styles for this application.
- dist/scripts.js: The minified JavaScript file that includes the application logic.
- pokemon-23.svg: An image file used as the logo in the navigation bar.
- js/promise-polyfill.js: The Promise polyfill script.
- js/fetch-polyfill.js: The Fetch polyfill script.

![Screenshot](img/Screenshot%202023-07-07%20at%2012.20.08.png)

# LINKS

<a href="https://github.com/ywrth/Pokedex/tree/main" target="_blank">GitHub Repository</a>

<a href="https://ywrth.github.io/Pokedex/" target="_blank">PokeDex live</a> 


## My Role and Tasks 

As the developer of this project, my role involved designing, developing, and deploying the JavaScript web application. Throughout the project, I faced several tasks, including:

- Researching and selecting a suitable external API that aligned with the project requirements.
- Implementing the functionality to fetch data from the API and dynamically display it on the page.
- Designing and styling the user interface using HTML and CSS to ensure an enjoyable user experience.
- Writing the necessary JavaScript code to handle user interactions, such as click events to show item details.
- Conducting thorough testing to ensure the application functions correctly and does not generate errors.
- Deploying the application to a publicly accessible platform, such as GitHub Pages, to share the project with others.

## Decisions and Consequences

Throughout the development process, I had to make various decisions, each with its own consequences. Some of the key decisions and their outcomes include:

- Choosing the Pokémon API as the external data source: This decision allowed me to create a Pokédex-inspired application that revolves around Pokémon-related data. However, it also meant that the application's scope was limited to Pokémon information.
- Emphasizing responsive design: By incorporating responsive design techniques, I ensured that the application is accessible and visually appealing across different devices and screen sizes. This decision enhanced the overall user experience and made the application more inclusive.
- Utilizing ESLint and Prettier for code formatting: I decided to enforce code formatting rules using ESLint and Prettier. This choice helped maintain code consistency and readability, making collaboration and future maintenance easier.

## Areas for Improvement

Reflecting on this project, there are a few areas where I could make improvements:

- Enhancing error handling: Implementing robust error handling mechanisms would allow the application to handle scenarios such as offline data loading and display user-friendly error messages, enhancing the overall user experience.
- Adding loading indicators: Incorporating loading indicators during data retrieval from the API would provide visual feedback to users and improve the perceived performance of the application.
- Expanding browser compatibility: While the application currently supports popular browsers, exploring compatibility with newer browser versions and additional platforms would further increase its accessibility.

## Lessons Learned

Working on this project has provided me with valuable lessons and insights:

- Interacting with external APIs: I gained experience in retrieving data from an external API and integrating it into my application, expanding my understanding of API usage.
- Front-end development best practices: Through designing and styling the user interface, I honed my skills in creating visually appealing and user-friendly web applications, considering aspects such as layout and responsiveness.
- Troubleshooting and debugging: Throughout the development process, I encountered various challenges and further developed my ability to identify and resolve issues, enhancing my problem-solving skills.