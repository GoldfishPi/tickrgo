import React from 'react';
import { BiTrendProvider } from "./TrendProvider";

export const BiProviders:React.FC = ({ children }) => (<>
    <BiTrendProvider>
        { children }
    </BiTrendProvider>
</>);

