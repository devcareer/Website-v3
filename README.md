# Devcareers Website-v3

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

## About DevCareers

DevCareer is a Non-Profit organization that is focused on supporting upcoming developers with resources to excel into world class

Underdeveloped African countries are lacking when it comes to adequate resources to dive into Tech. DevCareer is focused on supporting these group of people.

## Contributing

We welcome contributions to this project. For detailed information on how to go about contributing to this project, please read our:

- [Contributing Guidelines](/CONTRIBUTING.md)
- [Code of Conduct](/CODE-OF-CONDUCT.md)

## Built With

- [ReactJS](https://beta.reactjs.org/) - A JavaScript library for building user interfaces
- [MUI](https://mui.com/) - A programming language that lets you style HTML pages

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.

## Contributors

## Acknowledgements

- [Devcareers](https://devcareer.io/about-us)

## File Structure

In our src folder, we have components and pages basically. These folders are configured in such a way that they have an 'index.jsx' file each at their root. This file serves as an export point for all files in the respective folders. i.e If you take a look at the index.jsx in the components folder, you'll see there are a lots of export going on there. This is done in order to reduce the number of lines of import we will have to do in another file elsewhere whenever we need any file from "components" folder. This will be better understood if you take a look at "./src/pages/Root/Root.jsx".

- The usual way we go about importing a file is to navigate through the file directory i.e

import Nav from '../../components/Nav/Nav'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

- But you'll notice that all these files are located inside "components" folder and we are utilising lot of lines to import different things from same folder("components"). We can instead have our import like this which makes our code neater and saves us a lot of lines of relative imports i.e

import { Header, Footer, Nav} from '../../components';

- Also note, kindly let every component or page be in a folder i.e Home.jsx should be in "Home" folder, Footer.jsx should be in "Footer" folder. All related components being used on Home page can go into a folder called 'Home" under components.
