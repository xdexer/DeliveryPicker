import { createContext } from "react";

const mapPositionContext = createContext({
    position: [50.86079, 17.4674],
    setPosition: (pos: any) => {}
   }
 );

export default mapPositionContext;