const _Configuration = {
    DEVELOPMENT:{
        ENVIRONMENT                 : process.env.REACT_APP_DEVELOPMENT_HOST_ENV                ? process.env.REACT_APP_DEVELOPMENT_HOST_ENV                : '', 
        API_URL                     : process.env.REACT_APP_DEVELOPMENT_API_URL                 ? process.env.REACT_APP_DEVELOPMENT_API_URL                 : '', 
    },
    /* for now there's no difference for staging from production needed from the env file
    STAGING:{
        ENVIRONMENT                 : process.env.REACT_APP_STAGING_HOST_ENV                ? process.env.REACT_APP_STAGING_HOST_ENV                : '',  
        API_URL                     : process.env.REACT_APP_STAGING_API_URL                 ? process.env.REACT_APP_STAGING_API_URL                 : '',
    }, */
    PRODUCTION:{
        ENVIRONMENT                 : process.env.REACT_APP_HOST_ENV                ? process.env.REACT_APP_HOST_ENV                : '', 
        API_URL                     : process.env.REACT_APP_API_URL                 ? process.env.REACT_APP_API_URL                 : '',      
    }
   };

   
const getEnvironment = () => {
    const urlTest = window.location.href;
   
    //uncomment this line to allow localhost config when hosting in iis locally
    //if(urlTest.includes("localhost")) return "DEVELOPMENT";

    if(urlTest.includes("pilotdev")) return "DEVELOPMENT";
    //if(urlTest.includes("pilotstaging")) return "STAGING";
    //.env.development file contains localhost overrides and is used by CRA script when it's npm start command run
    //so PRODUCTION means localhost values here when run with start and not as a build command
    return "PRODUCTION"; 
  
  };
  
const Configuration = _Configuration[getEnvironment()];

   export default Configuration;