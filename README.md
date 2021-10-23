# Registration Form for Vege Battle (Vegan Cooking Competition)
## Gathering Data for the Dish

Disclaimer: This project has been worked as a part of the recruitment process for a Frontend (React) Engineer position.


### Requirements of the recruiter:

Create a form that will contain the following fields:
    name - dish name (text field)
    preparation_time - preparation time (duration field, would be nice if the input will be formatted like 00:00:00)
    type - dish type (select field with the following options: pizza, soup, sandwich)
    after selecting dish type, conditionally display other fields:
        for pizza:
            no_of_slices - # of slices (number field)
            diameter - diameter (float field)
        for soup:
            spiciness_scale - spiciness scale (1-10)
        for sandwich:
            slices_of_bread - number of slices of bread required (number field)

All fields should be required (fields depending on the dish type should be required conditionally based on what type of dish is selected).

Data should be submitted via POST request as a JSON to https://frosty-wood-6558.getsandbox.com:443/dishes and the form should support returned validation errors (if any).


### What was added to the project:

- design;
- media queries;
- animations (on opening)

### The app has been deployed to https://kristinapeneva.com/registration-form/
