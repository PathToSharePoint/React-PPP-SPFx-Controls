export interface IPropertyPaneHostsProps {
    hosts: Record<string,any>;
    updateHost: Function;
    forcePropertyPanePortalUpdate: any;
}

export function PropertyPaneHostsFactory()  {
    let hosts: Record<string,HTMLElement> = {};
    const updateHost = (targetProperty: string, hostElement: HTMLElement) => hosts[targetProperty] = hostElement;

    // Placeholder for Property Pane force update hook
    const forcePropertyPanePortalUpdate = {};

    return {hosts, updateHost,forcePropertyPanePortalUpdate};
}