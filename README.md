# LosRios-primo-nde
NDE development environment for the four NDE views at the Los Rios Libraries. The development environment comes from the [Ex Libris-maintained NDE repository](https://github.com/ExLibrisGroup/customModule). For now, each view is a separate development environment instance. There is probably a better way to maintain multiple views and when we learn what that is, we'll reorganize the repository. Certain view-level variables are found at /src/app/shared/constants/app.constants.ts

The libraries are initially migrating customizations from [their Primo VE views](https://github.com/Los-Rios-Libraries/Primo-VE-Views).

The repository is public to allow others to look at how the custom components are done, but please be aware that we are not professional developers and aspects of the components may be less than optimal. Obviously copying and adapting code is done at your own risk. Note that we are using chatbots pretty heavily to fill in substantial knowledge gaps, optimize component logic, etc.

Live NDE views may not be fully synced to the repository while we are in the early stages of development. The Sacramento City College view is likely to include the most customizations until we go live. Links:
* [American River College](https://caccl-lrccd.primo.exlibrisgroup.com/nde/home?vid=01CACCL_LRCCD:ARC)
* [Cosumnes River College](https://caccl-lrccd.primo.exlibrisgroup.com/nde/home?vid=01CACCL_LRCCD:CRC)
* [Folsom Lake College](https://caccl-lrccd.primo.exlibrisgroup.com/nde/home?vid=01CACCL_LRCCD:FLC)
* [Sacramento City College](https://caccl-lrccd.primo.exlibrisgroup.com/nde/home?vid=01CACCL_LRCCD:SCC)
## Development notes
### hostComponent and missing data
When getting data from hostComponent, it's pretty common for data to not be there on initialization. In addition, when the data is eventually populated, it is pretty common for NDE not to issue a new object, rather the object mutates. This means that monitoring for changes using Signal doesn't work. I've found it necessary to use [DoCheck](https://v17.angular.io/api/core/DoCheck) in order to get the updated data. But then it's important to limit the scope of what it's checking for. See the [Local Creators component](https://github.com/Los-Rios-Libraries/LosRios-primo-nde/blob/main/nde-scc/src/app/local-creators/local-creators.component.ts) for an example.
### Replacing an entire default component
Ex Libris has said that you can replace the contents of a full component, e.g. nde-landing-page - instead of hooking into e.g. nde-landing-page-after, you can just replace the whole thing. However, this doesn't necessarily happen as you'd expect. The default selector will remain in the DOM, and your custom component will appear as its next sibling.

In addition, the default content will briefly load before being destroyed. So you need to hide that content with CSS if you don't want to see it. 

Because of these limitations, I'm not really clear if using this strategy to replace various landing pages (homepage, browse, journal) is preferable to using e.g. -after.
### HTTP requests
When making HTTP requests of remote web services, I have gotten errors when trying to use the provideHttpClient() method, which apparently is the usual way to accomplish this in current Angular. I initially had success using [HttpClientModule](https://angular.dev/api/common/http/HttpClientModule), but this will break when the framework is updated to Angular 20. So now I am using the regular JavaScript fetch API.
### Add-on drama
When I started using the LibKey add-on, my development environment broke even though the built/live version was fine. This was apparently caused by conflicts between production-level activity (add-ons don't operate as dev) and the dev environment. The fix was to edit webpack.config.js, uncommenting a block that sets ngDevMode to 'undefined'.
