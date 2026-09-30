# Home Page Logo Custom Component
This component places an image from the /src/assets/images directory above the search box. The logo appears on the home/landing page only.

The component imports the ngrx store to detect whether the landing page is currently being displayed.

## Visually hiding h1
The h1 element might look odd with the logo there. We are visually hiding it by adding the following to /src/assets/css/custom.css:

`.custom-search-bar-container h1 {
  position: absolute !important;
  left: -99999px;
}`

## Adapting this component
### Mapping
1. In customComponentMappings.ts, add the following to the list of imports at the top:
`import { HomepageLogoComponent } from '../homepage-logo/homepage-logo.component';`
2. In the array map of the same file, add the following:
`['nde-top-bar-before', HomepageLogoComponent],`

### Edits
You will need to put your image file in /src/assets/images. In homepage-logo.component.ts, you will see a property named **imageUrl**. If your image file has a different name, either rename your file or edit the value of this property. For instance:
``imageUrl = `${__webpack_public_path__}assets/images/my-file.png`;``

The component imports routerState.model.ts from /src/apps/shared/models. It's not necessary for the component to work. If you don't want to add this file, make the following changes:
- Delete the line reading `import { PrimoRouterState } from '../shared/models/routerState.model';`
- Change `const selectRouterState = createFeatureSelector<PrimoRouterState>('routerState');` to `const selectRouterState = createFeatureSelector<any>('routerState');`

In the .html file, you may want to edit the alt text. Also set the *height* value to the height of your image.

In the .css file, we have set the max-height to 80px for small screens. Depending on your image you might want to change that rule.