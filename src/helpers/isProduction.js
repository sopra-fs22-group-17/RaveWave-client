/*
* This helper function returns a flag stating the current environment.
* If an environment variable is found with NODE_ENV set to true, (e.g. in Heroku) then is a prod environment.
* Otherwise, dev.
*
* More about window object:
* https://www.w3schools.com/jsref/obj_window.asp
 */
export const isProduction = () => {
  return process.env.NODE_ENV === "production";
};
