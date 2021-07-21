// Author: Christophe Humbert (User Managed Solutions LLC) 
// Github: @PathToSharePoint 
// Twitter: @Path2SharePoint

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { IPropertyPanePortalProps } from './IPropertyPanePortalProps';

export const PropertyPanePortal: React.FunctionComponent<IPropertyPanePortalProps> = (props) => {

    // We'll force a re-render when the hosts are in place
    const [, setPropertyPanePortalRefresh] = React.useState(new Date().toISOString());
    props.propertyPaneHosts.forcePropertyPanePortalUpdate = setPropertyPanePortalRefresh;

    const portals = [];

    React.Children.forEach<React.ReactNode>(props.children, (child: React.ReactElement) => {
        if ((child)
            && (child.props["data-Property"])
            && (props.propertyPaneHosts.hosts[child.props["data-Property"]])
            && (props.propertyPaneHosts.hosts[child.props["data-Property"]] instanceof HTMLElement)) {
                portals.push(ReactDOM.createPortal(child, props.propertyPaneHosts.hosts[child.props["data-Property"]]));
            }
    });

    return (<>{portals}</>);
};