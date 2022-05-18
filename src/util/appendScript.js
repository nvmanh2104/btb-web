export const appendScript = (scriptToAppend) => {
    const s = document.createElement("script");
    // s.type ='text/javascript';
    s.src = scriptToAppend;
    s.async = true;
    document.body.appendChild(s);
}