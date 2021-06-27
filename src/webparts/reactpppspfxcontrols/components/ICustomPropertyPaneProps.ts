import { IPropertyPaneHostsProps } from "../../../PPP/PropertyPaneHostsStore";

export interface ICustomPropertyPaneProps {
    propertyBag: object;
    renderWP: Function;
    propertyPaneHosts: IPropertyPaneHostsProps;
}