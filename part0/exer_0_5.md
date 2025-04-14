```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server->>browser: spa.html
    deactivate server
    Note right of browser: Browser renders the HTML File

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server->>browser: main.css
    deactivate server
    Note right of browser: Browser renders the CSS File

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server->>browser: spa.js
    deactivate server
    Note right of browser: Browser starts executing the JavaScript code that fetches the JSON File  
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server->>browser: data.json
    deactivate server
    Note right of browser: Browser renders the notes from the JSON File

```