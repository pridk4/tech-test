
# Prerequisites

Java 21: 

- Direct download: [https://www.oracle.com/uk/java/technologies/downloads/#java21](https://www.oracle.com/uk/java/technologies/downloads/#java21)
- Or use a package manager to install openjdk such as:
    - Mac: brew
    - Linux/WSL: [apt/yum/dnf etc…]
    - Windows: choco

Maven:

- Mac (Using homebrew): `brew install maven`
- Linux/WSL: `sudo [apt/dnf/pacman] install maven` (choose whatever package manager you have)
- Windows (Using chocolatey): `choco install maven`

Node.js 20+ (it should install npm too) [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager)

PNPM 9+ [https://pnpm.io/installation](https://pnpm.io/installation) 

# Helpful Documentation/Tips

- Install some API testing application such as Postman or Insomnia, this will help you with testing your backend code.
- RESTful API [https://aws.amazon.com/what-is/restful-api/#seo-faq-pairs#what-restful-api-client-contain](https://aws.amazon.com/what-is/restful-api/#seo-faq-pairs#what-restful-api-client-contain)
- Methods that can be used on the PersonRepository:  [https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/CrudRepository.html](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/CrudRepository.html)
- Tailwind CSS docs: [https://tailwindcss.com/docs/](https://tailwindcss.com/docs/) (installation and basic setup has already been done).
- Extensions/intellisense in your IDE for Java, SpringBoot, TypeScript and Tailwind CSS.

# How to run the application

- After install dependencies, clone and run `pnpm install` once. If you do choose to add any other dependencies then run this again.
- To compile the backend & frontend code `pnpm run build`
    - To specify one use `build:backend` or `build:frontend` instead
- To start both servers: `pnpm run start`
    - To specify one use `run:backend` or `run:frontend` instead

- By default the backend server should run on [http://localhost:8080](http://localhost:8080)
- By default the frontend server should run on [http://localhost:3000](http://localhost:3000)

# Tasks

Some tasks are marked with comments

### Backend:

Note: After changes you will need to close the server with Ctrl+C in the terminal and re-run the build and start commands.


> 💡 Usually you wouldn’t manually set an ID but for simplicity this task manually sends an ID in the API endpoint


1. In [Person.java](http://Person.java) add some more sensible attributes, don’t change the ID attribute.
2. In [PersonService.java](http://PersonService.java) Finish implementing the logic for the POST endpoint to create a new person record in the database. Also populate the getPath/postPath with the URL path you want. 
3. In [PersonController.java](http://PersonController.java) and [PersonService.java](http://PersonService.java) Implement a new PUT endpoint for updating, which should use an ID to update a specific record.

### Frontend:

Note: This frontend has fast refresh so any saved changes are reflected instantly on the web page, no need for rebuilding.

1. In PersonForm.tsx Add your custom attributes to the personSchema (zod has built in validation methods you can use), then populate your postPath & putPath, finally add your attributes as input fields to the form.
2. Add some validation for one of your Person fields, this can be done however and wherever you choose (e.g. validate an email is in the correct format or names start with capital letters).
3. In PersonForm.tsx Add a dynamic success message depending on whether the user has created or updated a person.
4. In PersonView.tsx use the GET endpoint to fetch and return a specific Person from their id when the View button is pressed. Then display the response below the View button.
5. In App.tsx, PersonForm.tsx and PersonView.tsx, there is already some basic styling but it is incomplete and unprofessional, your task is to add more styling using tailwindcss (e.g. spacing, alignment, shapes and colours). You can use tailwind’s default colours or add some of your own in the tailwind.config.js file. There is a lot of freedom here to show off frontend skills, you can completely redesign the layout, and change anything about the styling you want as long as all previous functionality is possible.
