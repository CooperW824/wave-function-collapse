# WaveFunctionCollapse

An Angular Implementaion of the Wave Function Collapse Algorithm from [mgxmn](https://github.com/mxgmn/WaveFunctionCollapse)

## What is Wave Function Collapse?
From the [Wikipedia Article](https://en.wikipedia.org/wiki/Wave_function_collapse): "In quantum mechanics, wave function collapse occurs when a wave function—initially in a superposition of several eigenstates—reduces to a single eigenstate due to interaction with the external world."

In plain english, wave funtion collapse is when an object or bit of information goes from having many states that it could be in to only having one possible state that it could be in due to external factors. 

In the wave function collapse algorithm, each cell acts as our wave-function, the cell has a variety of tiles it could be, but as its surrounding cells collapse, the possible tiles a certain cell could collapse to decreases. This decrease occurs as the tile of one cell can only touch the tile of another cell if they have the same side patern. 

For Example:

Two Valid Cells:  ![A Valid Connection](validConnection.png)

Two Invalid Cells: ![An Invalid Connection](invalidConnection.png)

## The algorithm

My Description: 
1. Generate a two-dimensional array of cells to display
2. Collapse the cell at (0,0) by randomly selecting a tile
3. Evaluate the valid tiles of the surrounding cells
4. Set the entropy of the surrounding cells equal to the length of the list of valid tiles. 
5. Collapse the surrounding cell wtih the lowest entropy by selcting a random valid tile. 
6. Repeat steps 3-5 until the board is filled.

mgxmn's Description: 
1. Read the input bitmap and count NxN patterns.
    1. (optional) Augment pattern data with rotations and reflections.
2. Create an array with the dimensions of the output (called "wave" in the source). Each element of this array represents a state of an NxN region in the output. A state of an NxN region is a superposition of NxN patterns of the input with boolean coefficients (so a state of a pixel in the output is a superposition of input colors with real coefficients). False coefficient means that the corresponding pattern is forbidden, true coefficient means that the corresponding pattern is not yet forbidden.
3. Initialize the wave in the completely unobserved state, i.e. with all the boolean coefficients being true.
4. Repeat the following steps:
    1. Observation:
        1. Find a wave element with the minimal nonzero entropy. If there is no such elements (if all elements have zero or undefined entropy) then break the cycle (4) and go to step (5).
        2. Collapse this element into a definite state according to its coefficients and the distribution of NxN patterns in the input.
    2. Propagation: propagate information gained on the previous observation step.
5. By now all the wave elements are either in a completely observed state (all the coefficients except one being zero) or in the contradictory state (all the coefficients being zero). In the first case return the output. In the second case finish the work without returning anything.

# Angular Information

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Unit Tests have not yet been implemented.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

End to end tests have also not been implemented yet.

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
