Getting started with Material UI
In order to set up Material UI in your project, you need to have a working React project.

Setting up a React project
One prerequisite before creating a React app is to install Node.js on your system, as it is required to provide the necessary runtime environment for executing JavaScript code on the server or local machine.

Now you can follow the below steps:

Open the command prompt in the folder where you want to have your React app. You can move the chosen folder location with the cd (change directory) command.
Type the following command to create a boilerplate setup. npm init vite@latest my-react-app --template react Additionally, you can also use NextJS, which is a production-grade framework built on top of ReactJS. You can use the following command to set up a NextJS project: npx create-next-app 
Now change the working directory  to your project directory using the following command. cd project-directory‍
Start your development server by running npm start or npm run dev on the terminal.
Now that you have finished setting up your React project setup, let's integrate Material UI into the project.

Install Material UI
Material UI can be installed on your project using the package manager of your choice. NPM and yarn are the most popular ones. 

To add Material UI to your project, run one of the following commands:

NPM - npm install @mui/material @emotion/react @emotion/styled

Yarn - yarn add @nui/material @emotion/react @emotion/styled

After installing Material UI, you can now import the UI components into your React component by using the syntax.


            Copy
    
import Element from “@mui/*”;
Now that Material UI is installed on your project, let's understand the basic UI components present in Material UI.

Understanding the basic UI components in Material UI
As we mentioned earlier, Material UI is a vast library with lots of components that we can use. All we have to do is import the component, and we can directly start using the MUI component in our React application.

Some of the most commonly used Material UI components are:

Buttons
Most websites use buttons for CTAs, and Material UI provides a wide range of button components that can be used in different scenarios. A Button component can be used to respond to user clicks and show some animations. 

Mainly, there are three variants for the Button component:

Text button: Text buttons are commonly used for actions that are not as prominent, such as those found in dialogs and cards.
Contained button: Contained buttons are highly emphasized and can be distinguished by their use of elevation and fill
Outlined button: These are medium-emphasis buttons. They include actions that are important but aren't the main focus of an app.
Let’s look at an example of using the Button component to render three buttons with different variants (text, contained, and outlined).


            Copy
    
import * as React from 'react';
import Button from '@mui/material/Button';

export default function App() {
  return (
    <>
   
    <Button variant="text">Text</Button>
    <Button variant="contained">Contained</Button>
    <Button variant="outlined"> Outlined</Button>
    </>
  );
}
Output:

Material Ui buttons
Text Fields
Text fields are used to take input directly from the user in a web application. Material UI provides a TextField component that can be used to create text fields. It is often used with form elements for handling user data. 

TextField also has three variants: outlined, filled, and standard. This code is an example of the different variants of the Material UI TextField component. 

Filename: App.jsx


            Copy
    
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function BasicTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" />
    </Box>
  );
}
Output:

Material UI TextField Variant
Icons
Material UI offers three distinct methods for incorporating icons into your project:

Standardized material icons:  These icons come pre-packaged as React components in SVG format.
SvgIcon component: With these icons you can use custom SVG icons while still using React's features.
Icon component: The icon component allows you to use custom font icons within your project, again wrapped in React to ensure optimal performance.
Using standardized material icons

To use standardized Material Icons, you need to additionally install the @mui/icons-material  package using the package manager you prefer.

This code example demonstrates how to use three Material UI icons such as CloudIcon, PersonIcon, and BugReportIcon. We will update the default color and render them on the screen.


            Copy
    
import * as React from "react";
import BugReportIcon from "@mui/icons-material/BugReport";
import PersonIcon from "@mui/icons-material/Person";
import CloudIcon from "@mui/icons-material/Cloud";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


export default function IconCard() {
  return (
    <Card sx={{ maxWidth: 645, margin: 15 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Featured Icons
        </Typography>
        <BugReportIcon sx={{ fontSize: 50, padding: 5, color: "red" }} />
        <PersonIcon sx={{ fontSize: 50, padding: 5, color: "brown" }} />
        <CloudIcon sx={{ fontSize: 50, padding: 5, color: "blue" }} />
      </CardContent>
    </Card>
  );
}
Output:

Standard icons in Material UI
Using custom SVG Icons

Sometimes you may need custom icons that may not be readily available in Material UI icons. To our aid, we can use the SvgIcon wrapper available in Material UI to create custom icons. 

MUI offers built-in accessibility for the SVG icons, and it can be easily used with other MUI components. SVG elements should be scaled so that they fit in a 24x24px viewport, and the viewBox attribute can be changed to fit your needs. The icon's default colour is inherited, but you can set a specific theme colour using the color prop.

Syntax:


            Copy
    
import SvgIcon from "@mui/material/SvgIcon";
import { red } from "@mui/material/colors";

function CustomSvgIcon(props) {
  return (
    <SvgIcon {...props}>
      {/* SVG content goes here */}
    </SvgIcon>
  );
}
Using Icon component

The Icon component allows you to have vector icons for your application. It acts like a wrapper for any icon font that supports ligatures, meaning you can use it with various fonts, including the popular Material Icons font. Before using the Icon component, you need to include an icon font in your project, such as the Material Icons font.

The following example shows how to use Font Awesome with Material UI. For this, you first install its package @fortawesome/react-fontawesome using npm or yarn, whichever one you prefer.


            Copy
    
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faMale, faPodcast


} from "@fortawesome/free-solid-svg-icons";
const App = () => {
  return (
    <div>
      <Card sx={{ margin: 16 }}>
        <CardContent>
          {/* text */}
          <Typography
            variant="h7"
            component="div"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <FontAwesomeIcon
              icon={faPodcast}
              style={{ margin: 1, color: "red" }}
            />{" "}
            Podcast! Happening Now
          </Typography>


          <Typography variant="h7" component="div">
            <FontAwesomeIcon
              icon={faMale}
              style={{ margin: 1, color: "#00d8d3" }}
            />{" "}
            One user joined!
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};


export default App;
Output:

Example usage of font awesome icons in Material UI
Cards
Cards are one of the most commonly used UI elements that you can use to display information with a boundary. They are self-contained boxes with specific information, such as text, and images. You can see cards being used on the pricing page, in blog previews, when featuring a product, etc.

Here is an example of working with the Card component to feature a product. We use the CardMedia component to render an image here inside the card.


            Copy
    
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";


const App = () => {
  return (
    <div
      className=""
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <CardMedia
            component="img"
            height="200"
            sx={{ objectFit: "cover" }}
            image="https://ph-files.imgix.net/8e58f8ba-f842-4f27-b343-ee78e35115ee.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&fit=max&dpr=1"
          />


          <Typography gutterBottom variant="h5" component="div">
            Save revenue, customers, and sleepless nights with Zipy Plug & Play
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Zipy Plug & Play is a powerful tool powered by ChatGPT that helps you record and replay browser sessions. It allows you to fix network failures, JS exceptions, and console errors, and can be used by Support, Product, Growth, and Development teams.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
};


export default App;
Output:

Material UI Card example
Typography
The Typography component  allows developers to effectively display text in various styles, sizes, and weights. It helps create a visual hierarchy and communicates essential information to the user, and search engine. 

The common typography heading types are:

h1: Used as page title. It should only be used once in a page.

            Copy
    
<Typography variant="h1">Main Heading</Typography>
h2: Used in section headings within the page.

            Copy
    
<Typography variant="h2">Section Heading</Typography>
h3: Used in sub-section headings within a section.

            Copy
    
 <Typography variant="h3">Sub-Section Heading</Typography>
h4: Use in minor headings within a section or sub-section.

            Copy
    
<Typography variant="h4">Subheading</Typography>
h5: Used in minor headings or labels within a section or sub-section.

            Copy
    
<Typography variant="h5">Minor Heading</Typography>
h6: Use for captions or labels within a section or sub-section.

            Copy
    
<Typography variant="h6">Caption or Label</Typography>
Appbar
AppBar is a core component in Material-UI that is used to create a top navigation bar for web applications. The top app bar displays content and actions that are relevant to the current screen. It's used for branding, screen titles, navigation, and actions.

I'm sharing a piece of code, to demonstrate the use of Material UI's styled components to create a custom AppBar component that includes a logo, links, and a search bar. The code uses useState to handle search input and styled components to set custom styles for the AppBar, Toolbar, Logo, Search, SearchIcon, LinkItems, and InputBase components.


            Copy
    
import { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";


const StyledAppBar = styled(AppBar)({
  backgroundColor: "#000",
  color: "#fff",
  boxShadow: "none",
  borderBottom: "1px solid #E6E6E6",
  position: "fixed",
  padding: "5px",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  marginTop: " 8rem",
});


const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});


const StyledLogo = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1.5rem",
});


const StyledSearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#F2F2F2",
  "&:hover": {
    backgroundColor: "#E6E6E6",
  },
  marginLeft: 0,
  width: "40px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));


const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  color: "black",
  alignItems: "center",
  justifyContent: "center",
}));


const StyledLinkItems = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "50%",
  [theme.breakpoints.down("md")]: {
    display: "none",
    width: "0",
    overflow: "hidden",
  },
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#000",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));


export default function App() {
  const [search, setSearch] = useState("");


  const handleSearch = (event) => {
    setSearch(event.target.value);
  };


  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <StyledLogo variant="h3" noWrap>
          <img src=”https://tinyurl.com/yx55239r” alt="logo" />
        </StyledLogo>


        <StyledLinkItems>
          <Typography variant="h6" noWrap>
            Product
          </Typography>
          <Typography variant="h6" noWrap>
            Solutions
          </Typography>
          <Typography variant="h6" noWrap>
            Resources
          </Typography>
          <Typography variant="h6" noWrap>
            Company
          </Typography>
          <Typography variant="h6" noWrap>
            Log In
          </Typography>
        </StyledLinkItems>

        <StyledSearch>
          <StyledSearchIcon />
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={search}
            onChange={handleSearch}
          />
        </StyledSearch>
      </StyledToolbar>
    </StyledAppBar>
  );
}
Output:

Zipy's Navbar made using Material UI styled components
Forms in Material UI
Material UI provides easy-to-use and visually appealing form components. We can customize the size, color, and styling of the form elements. Additionally, Material UI provides form-specific components, such as FormLabel, FormControl, and FormHelperText, to make forms more accessible and user-friendly. 

Let’s now talk about some of the form elements and see how you can use them in your project.

TextField: As we mentioned earlier, the TextField component provides an input field that can be used for text, numbers, and passwords. It supports various types of input, such as email, phone number, and date, and comes with customization options.

Material UI also makes it easy to validate user input in forms and provide feedback for any errors. There are built-in validation functions that can be used with form elements like TextField. These validation functions include checking for required fields, valid email

addresses, numbers, and character limits. By using these functions, you can ensure that users enter valid input and provide clear feedback when errors occur.

Syntax


            Copy
    
<TextField id="outlined-basic" label="Outlined" variant="outlined" />
Checkbox: Checkboxes are a common UI element in forms and are mostly used when we want the user to select multiple options or toggle on or off a single option.

Syntax


            Copy
    
<Checkbox checked={checked} onChange={handleChange}  color="primary"  disabled={disabled}/>
The following code will help you create checkboxes in your forms.


            Copy
    
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const envsInfo= [
  { label: 'User details', value: 'user' },
  { label: 'Browser details', value: 'browser' },
  { label: 'Session replay and id', value: 'sessio', disabled: true },
  { label: 'User agent details', value: 'userAgent', disabled: true, checked: true },
];


export default function DebuggingCheckboxes() {
  const [selectedDebuggingOptions, setSelectedDebuggingOptions] = React.useState([]);


  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedDebuggingOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(value)) {
        return prevSelectedOptions.filter((option) => option !== value);
      } else {
        return [...prevSelectedOptions, value];
      }
    });
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',width:"99vw" }}>
      <Card  sx={{padding:5}}>
        <CardContent>
         
          <Typography variant="h4" component="div" style={{ marginBottom: '1rem' }}>
What user environment information do you need to debug? You can select multiple options.      

          </Typography>
          {envsInfo.map((option) => (
            <div key={option.value} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <Checkbox
                checked={selectedDebuggingOptions.includes(option.value)}
                onChange={handleCheckboxChange}
                value={option.value}
                disabled={option.disabled}
                sx={{ marginRight: '0.5rem' }}
              />
              <Typography variant="body1" component="label" htmlFor={option.value} style={{ marginLeft: '0.5rem' }}>
                {option.label}
              </Typography>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
Output:

Material UI checkbox example
RadioGroup: This component provides a group of radio buttons that allow users to select one option from a set of mutually exclusive choices.

Syntax


            Copy
    
<RadioGroup aria-label="*" name="name">
          <FormControlLabel
            value="value"
            control={<Radio />}
            label="label"
          />
</RadioGroup>
The following code demonstrates how to use Material UI’s Radio and RadioGroup components. Each radio button is wrapped in a FormControlLabel component that provides the label for the radio button.


            Copy
    
import * as React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  Card,
  RadioGroup,
  Typography,
} from "@mui/material";


const label = { inputProps: { "aria-label": "Checkbox demo" } };


export default function Checkboxes() {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100vw" }}>
      <Card>
        <FormControl component="fieldset" sx={{ margin: 16 }}>
          <FormLabel component="legend">
            <Typography variant="h4" marginBottom="2rem">
              What kind of debugging do you want to do?
            </Typography>
          </FormLabel>
          <RadioGroup aria-label="gender" name="clg">
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Console & Network log"
            />
            <FormControlLabel
              value="Male"
              control={<Radio />}
              label="Stack trace"
            />
            <FormControlLabel
              value="new gender"
              control={<Radio />}
              label="All of the above"
            />
          </RadioGroup>
        </FormControl>
      </Card>
    </div>
  );
}
Output:

Example use case of Material UI Radio component
Select: The Select component in MUI allows you to have one or more options selected from a drop-down list.  It supports various customization options such as search, filtering, and grouping. 

Syntax


            Copy
    
<Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      style={{ width: 300 }}
      value={selectedValue}
      label="Select no of employees"
      onChange={handleChange}
      fullWidth
    >
      <MenuItem value="small">1-25</MenuItem>
      <MenuItem value="medium">26-50</MenuItem>
      <MenuItem value="large">51-100</MenuItem>
      <MenuItem value="MNC">100+</MenuItem>
    </Select>
The following code demonstrates how to use Material UI's Select and MenuItem components to create a dropdown list.


            Copy
    
import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";


export default function App() {
  const [selectedValue, setSelectedValue] = useState(""); 
  const handleChange = (event) => {
    setSelectedValue(event.target.value);   };


  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={1}
        sx={{
          width: 500,
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "auto",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ padding: 1 }}>
          How many employees are there in your company?{" "}
        </Typography>
        <FormControl>
          <InputLabel id="demo-simple-select-label">No of employees</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{ width: 300 }}
            value={selectedValue}             label="Select no of employees"
            onChange={handleChange}             fullWidth
          >
            <MenuItem value="small">1-25</MenuItem>
            <MenuItem value="medium">26-50</MenuItem>
            <MenuItem value="large">51-100</MenuItem>
            <MenuItem value="MNC">100+</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    </div>
  );
}
Output:

Example use case of Material UI Select component
Switch: The Switch component provides a simple yes or no type of selection option, allowing users to toggle between two states like on/off or true/false.

The following code demonstrates the implementation of Material UI's Switch component. Here we created a set of four switches from which the user can toggle between one or more options.


            Copy
    
import * as React from "react";
import Switch from "@mui/material/Switch";
import { Card, Typography } from "@mui/material";


const label = { inputProps: { "aria-label": " updates" } };


export default function RegistrationForm() {
  return (
    <div style={{ width: "100vw" }}>
      <Card sx={{ width: "50vw", margin: "auto", padding: 5 }}>
        <Typography variant="h4" sx={{ marginBottom: "2rem" }}>
          Select Zipy features that you have used
        </Typography>


        {[
          "Session replay",
          "Stack trace",
          "Console and Network logs ",
          "AI Resolve",
        ].map(function (value) {
          return (
            <>
              {" "}
              <Switch
                key={value}
                name={value}
                value={value}
                color="primary"
                inputProps={label}
              ></Switch>
              <label>{value}</label>
              <br />
            </>
          );
        })}
      </Card>
    </div>
  );
}
Output:

example use case for Switch component in Material UI
Slider: This Slider component provides a slider that allows users to drag and select a value from a range. It is a horizontal bar with a thumb or marker that users can drag along the bar to select a value.

This following code demonstrates how to use Material UI's Slider component to create a slider with customizable values.


            Copy
    
import * as React from "react";
import Slider from "@mui/material/Slider";
import { Paper, Typography } from "@mui/material";


function value(value) {
  return `${value}%`;
}


export default function App() {
  return (
    <div style={{ width: "100vw",height:"100vh", margin: "auto", display: "grid", placeItems: "center",background:"rgb(255,255,255)" }}>
      <div style={{ paddingBottom: "1rem" }}>
        <Paper sx={{ padding: 5 }} elevation={1}>
          <Typography variant="h6" sx={{marginBottom:5}}>
            How satisfied are you with our Product?
          </Typography>


          <Slider
            aria-label="Satisfaction Level"
            defaultValue={50}
            getAriaValueText={value}
            valueLabelDisplay="on"
            step={10}
            marks
            min={0}
            max={100}
          />
        </Paper>
      </div>
    </div>
  );
}
Output:

Example use case of Material UI slider
You can create full fledged responsive forms with Material UI that can be used in your web application. The forms and their components, such as inputs, selects, checkboxes, and radio buttons, can automatically adjust their sizes and layouts based on the available screen space.

Layouts in Material UI
One of the notable features of Material UI is its powerful layout system. It allows us to easily create responsive and adaptable layouts that look clean on any viewport. In this section, we will look at all the aspects of layouts using Material UI.

Grid system for creating responsive layouts
Grid systems are fundamental components of layout systems, and Material UI's grid system is no exception. Developers can easily create responsive layouts that adjust to different screen sizes using Material UI's 12-column grid system.

The grid is based on the Flexbox layout, which allows for flexible and dynamic content placement. To make a layout responsive, you can define how many columns each grid item should span at different screen sizes using the xs, sm, md, lg, and xl props.

You'll need to import the Grid component from Material UI to use the grid system. The following example shows how to create a basic grid layout in Material UI.

File name: Basicgrid.jsx


            Copy
    
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";


const products = [
  { name: " Filter errors " },
  { name: "Live User Sessions  " },
  { name: "Real user monitoring tool  " },
  { name: "Work seamlessly with you stack" },
  { name: "Debug at affordable prices with Zipy" },
];


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: "white",
}));


export default function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ padding: 5 }} elavation={1}>
        <Typography
          variant="h3"
          component="div"
          sx={{ textAlign: "center", margin: 8 }}
        >
          Features of Zipy.ai
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {products.map((product) => (
            <Grid item xs={9} sm={6} md={4} key={product.name}>
              <Item>{product.name}</Item>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
}
Output:

Grid system example
Container component in Material UI
The Container component offered by Material UI serves as a versatile tool for wrapping and centering content, making it ideal for designing responsive layouts that accommodate various screen sizes. 

The Container component in Material UI provides two types of styling and adjustment properties:

Fixed: If you prefer designing for a fixed set of sizes instead of accommodating a fully fluid viewport, you can use the Fixed property. With this property, the max-width matches the min-width of the current breakpoint.

The following code snippet shows how to use the fluid prop inside the container component:


            Copy
    
<Container fixed>
        <Box sx={{ bgcolor: 'black’, height: '10vh' }} />
</Container>
Here are the sample values for the maxWidth values of the Material UI Container component with the fixed prop:

sm (600-899px): The maxWidth will be 600px
md (900-1279px):  The maxWidth will be 900px
lg (1200-1536px):  The maxWidth will be 1200px
xl (1536px and above): The maxWidth will be 1536px
Fluid: The Fluid component functions as a container that envelops its content with a maxWidth value specified as a prop. This value serves as the default width of the container and determines the targeted screen width. 

Using the Fluid component in your Material UI design allows for a more flexible layout that can adapt to different screen sizes and devices.

By utilizing the Fluid component and setting the appropriate maxWidth value, you can ensure that your content is displayed optimally across various devices and screen sizes.

Syntax


            Copy
    
import Container from "@mui/material/Container";
export default function App() {
  return (
    <Container maxWidth="sm | md | lg | xl |">
      {/* Content goes here */}
    </Container>
  );
}
Box component for adding spacing and borders
Material UI  provides a Box component that you can use to add spacing and borders to your elements. The Box component is a versatile and adaptable component that allows you to easily customise your elements' spacing and borders. 

The Box component acts as a wrapper component for the majority of the CSS utility requirements. You can think of it as a <div> wrapper around your code.

The following code demonstrates how to use Material UI's Box component to create a section and you can notice in the code that we have done a good amount of styling to Box component.


            Copy
    
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";


export default function BoxComponent() {
 return (
   <Container
     maxWidth="lg"
     style={{
       display: "flex",
       justifyContent: "center",
       alignItems: "center"
     }}
   >
    <Box
       bgcolor="white"
       color="black"
       width="100%"
       height="400px"
       maxWidth="400px"
       borderRadius="8px"
       boxShadow={2}
       p={2}
       textAlign="left"
       justifyContent="center"
     >


       <img
         src="https://ph-files.imgix.net/e2223dee-2584-4bff-b368-f903112529e3.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&fit=max&dpr=1"
         alt="zipy"
         width="100%"
         style={{ borderRadius: "8px", marginBottom: "15px" }}
       />
       <Typography variant="body1" style={{ padding: "0 15px" }}>
         Zipy combines session replays with advanced devtools like stack trace,
         console log, and network log, providing a powerful debugging
         experience. It even integrates with ChatGPT for quick code
         suggestions.
       </Typography>
     </Box>
   </Container>
 );
}
Output:

Example use case of Material UI Box
Material UI Theming
Material UI is a developer friendly framework, as we can easily customize MUI with our own theme. Material UI theme is essentially a collection of settings that define the look and feel of your app’s components. Some of the key theme properties include:‍

‍Palette: Palette is the colors that are used throughout the app. The MUI palette also includes a variety of color types, such as primary, secondary, and error, each with their own shades.

            Copy
    
import { createTheme } from '@mui/material/styles';
import blue from '@mui/material/colors/blue';
import red from '@mui/material/colors/red';

const theme = createTheme({
  palette: {
    primary: red,
    secondary: blue,
  },
});
Typography: Typography includes the font families, sizes, and weights which allows you to have consistent typography styles to your UI components.

            Copy
    
const theme = createTheme({
  typography: {
    fontFamily: [
      "Roboto",
      '"Helvetica Neue"',
    ].join(","),
  },
});
Spacing: Spacing is used for consistent spacing between elements ensuring that the design looks visually balanced.

            Copy
    
const theme = createTheme();
theme.spacing(1); // `${8 * 1}px` = '8px'
Breakpoints: Breakpoints are used for responsive design settings. You can also override the existing breakpoints in Material-UI to define your own custom breakpoints that better suit the specific requirements of your application.

            Copy
    
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
Overrides: You can apply custom styles to specific components and this allows you to customize the appearance of Material UI components without modifying the default styles.

            Copy
    
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '2rem',
          padding: '1rem',
        },
      },
    },
  },
});
Props: You can use default properties for Material UI components to configure their behavior and appearance without needing to define custom styles or override default styles. Some of the examples of props include color, variant, disabled etc.
Just like using CSS variables, you can create custom variables to the theme so you can use them everywhere.

In the following code, we will use the createTheme function in Material UI, to create a custom theme object for your application. Here, we added the status object to an error property that is assigned the value of red[500], just like this you can add your own custom rules.


            Copy
    
const theme = createTheme({  
  status: {
  error: red[500],
  }
  });
Customizing Material UI components
Although Material UI provides almost all the components that we need, sometimes we need to customize it to match our design system. Material UI offers multiple options for customizing the styles of its components. The ideal approach for you will depend on the situation in hand. Some of the ways include:

1. One-off customization

You can adjust the styling for a single component instance, rather than applying changes to all instances of that component or creating a global theme. You can achieve it by using 'sx' prop, class name overrides, or state classes.

For example, you can use the sx prop to change the background colour of the Button component, as shown below:

2. Reusable Component

Reusable component that can be utilized in multiple places within an application, rather than being limited to a single location or page. These components can be customized using the styled function, which allows for overriding the default styles for a specific component.

3. Global Theme Overrides

With Material UI, you can change the way your components look using the createTheme function. This function helps you make a new theme object that you can tweak to suit your website's design system. Once created, the theme can be passed to the 'ThemeProvider' component.

4. Global CSS Override 

You can override the CSS rules of a Material UI component by using Global CSS overrider

In order to accomplish this you can pass the styles to the GlobalStyles component which will do the rest for you.

Advanced Material UI components
When you are using Material UI for building a basic React application, you can simply achieve that by using the basic UI component. But there may be times when you need to make the most out of Material UI. Now it's time to get familiar with some advanced MUI components.

Material UI seems like a simple component library, but it can help you build advanced UI components like dashboards, tables, etc. Most websites will have some kind of dynamic data and in order to render the data, we might need components like tabs, pagination, modals, drawers, etc.  We will look into some of the most commonly used advanced components as well in the later section.

Mantis dashboard built using Material UI
You can see from the above dashboard that we can create engaging user interfaces with the help of these UI components. Sometimes you may need to install some external libraries but for most of the time, Material UI got you covered.

Now let’s look at some of the advanced MUI components:

Modal
The Modal component in Material UI is like a foundation that you can build upon to create all kinds of modal windows. Whether you need a dialogue box, a popover, or a lightbox, the Modal component has got you covered.

The following code demonstrates how to create a basic modal using the Modal component in Material UI. Clicking the button opens the modal, which is handled by the handleonOpen function.


            Copy
    
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import { Image } from "@mui/icons-material";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};


const Zipy = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        sx={{ top: "300px", left: "600px" }}


      >
        <Typography variant="h5">Learn more about Zipy</Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Container sx={style}>
          <Typography variant="h4" id="modal-title" mb={2}>
            What is Zipy?
          </Typography>
          <Typography variant="h6" id="modal-description" mb={2}>
            Zipy is a one spot solutions for digital experience. It combines
            session replays with devtools like stack trace, console log, and
            network log. It helps product, marketing, and QA teams identify
            issues and engineers with error tracking, and debugging.
          </Typography>
        </Container>
      </Modal>
    </div>
  );
};


export default Zipy;
Output:

Material UI Modal example
Table
Material UI provides several table related elements to display tabular data and they can be fully customize. It’s commonly used to show the pricing table, and analytics dashboards..

You can refer to this code to create a table. For now, we have taken an example of error information that a debugging tool can capture. Our table shows categories and remarks for different types of errors.


            Copy
    
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";


const rows = [
  {
    type: "Console error",
    category: "Frontend",
    remarks: "Undefined error: check your types",
  },
  {
    type: "Validation error",
    category: "Frontend",
    remarks: "Email format error",
  },
  { type: "Error 404", category: "Network", remarks: "Network error 404" },
  { type: "Error 501", category: "Network", remarks: "Internal server error" },
  { type: "Error 502", category: "Network", remarks: "Internal server error" },
];


export default function ErrorTable() {
  return (
    <>
      <TableContainer component={Paper} sx={{ minWidth: 650, margin: 10 }}>
        <Table sx={{ minWidth: 650 }} aria-label="error table">
          <TableHead>
            <TableRow>
              <TableCell>Type of Error</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.type}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
Output:

Example of using Material UI Table component
Drawer
Navigation Drawers are a user interface component commonly used in both web and mobile applications. They provide users access to different app pages by displaying a list of links or buttons. 

The following code creates a Material-UI drawer that is left aligned. Clicking the hamburger menu opens a drawer with a list of items rendered using MUI components. It is often used in mobile devices to create a responsive layout.


            Copy
    
import * as React from "react";
import {
  Drawer,
  Button,
  List,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "@mui/material";


import { Container } from "@mui/material";


import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";


export default function MyDrawer() {
  const [drawerState, setDrawerState] = React.useState(false);


  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState(open);
  };


  const renderList = () => (
    <Container
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );


  return (
    <div>
      <Button
        onClick={toggleDrawer(true)}
        style={{
          position: "absolute",
          top: "15px",
          right: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            margin: 2,
            width: "40px",
            height: "5px",
            background: "blue",
          }}
        ></div>
        <div
          style={{
            margin: 2,
            width: "40px",
            height: "5px",
            background: "blue",
          }}
        ></div>
        <div
          style={{
            margin: 2,
            width: "40px",
            height: "5px",
            background: "blue",
          }}
        ></div>
      </Button>
      <Drawer anchor="left" open={drawerState} onClose={toggleDrawer(false)}>
        {renderList()}
      </Drawer>
    </div>
  );
}
Output:

Material UI Drawer example
On mobile devices, the drawer will look like this:

Mobile version of Material UI Drawer
Image List
The Image List component allows you to display a collection of images in an organised grid.

The following code displays an image list using Material-UI's ImageList and ImageListItem components. The images are rendered from an array of data containing URLs and titles for each image.


            Copy
    
import * as React from "react";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "./App.css";
export default function NatureImageList() {
  return (
 <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& > :not(style)": { m: 1 },
      width: "100vw",
      height: "100vh",
    }}
    >

    <ImageList
      sx={{ width: "80vw", height: "80vh", margin: "auto",justifyContent:"center",alignItems:"center",display:"flex",flexWrap:"wrap" }}

      cols={3}
      rowHeight={40}
      style={{ padding: 10 }}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}`}
            srcSet={`${item.img}`}
            alt={item.title}
            style={{ objectFit: "contain", width: "80%" }}
          />
        </ImageListItem>
      ))}
    </ImageList>
</Box>
  );
}

const itemData = [
  {
    img: "https://shorturl.at/dnqvU",
    title: "Zipy",
  },
  {
    img: "https://shorturl.at/luQVZ",
    title: "Zipy",
  },
  {
    img: "https://shorturl.at/ptIK0",
    title: "Zipy",
  },
  {
    img: "https://shorturl.at/oqEVZ
    title: "Zipy",
  },
  {
    img: "https://tinyurl.com/mu3xkrjf",
    title: "Zipy",
  },
  {
    img: "https://tinyurl.com/ys43vwjz”
    title: "Zipy",
  },
];
Output:

Material UI Image List example
Wrapping it Up
Congratulations on reaching this far! You are a fantastic reader!

We know that user experience is the deal breaker in the current market, creating a demand for beautiful and functional products. Material UI with its powerful and modern framework can be a lifesaver. So try it out and craft visually appealing, user-friendly, and responsive applications faster. 

Material-UI, licensed under MIT, allows freedom to use, modify, and distribute without sharing source code or modifications. In today's market, user experience is crucial, and Material UI's modern framework helps create visually appealing, user-friendly, and responsive applications quickly. Give it a try!

Happy Materializing!