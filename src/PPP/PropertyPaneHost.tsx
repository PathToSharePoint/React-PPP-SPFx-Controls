// Author: Christophe Humbert (User Managed Solutions LLC) 
// Github: @PathToSharePoint 
// Twitter: @Path2SharePoint

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneCustomFieldProps, IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-property-pane';
import { IPropertyPaneHostsProps } from './PropertyPaneHostsStore';

export interface IPropertyPaneHostBuilderProps extends IPropertyPaneHostsProps {
}

export interface IPropertyPaneHostBuilderInternalProps extends IPropertyPaneHostBuilderProps, IPropertyPaneCustomFieldProps {
}

export class PropertyPaneHostBuilder implements IPropertyPaneField<IPropertyPaneHostBuilderInternalProps> {

  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneHostBuilderInternalProps;
  private elem!: HTMLElement;
  private context!: any;

  constructor(targetProperty: string, properties: IPropertyPaneHostsProps) {
    this.targetProperty = targetProperty;
    this.properties = {
      key: targetProperty,
      hosts: properties.hosts,
      updateHost: properties.updateHost,
      forcePropertyPanePortalUpdate: properties.forcePropertyPanePortalUpdate,
      onRender: this.onRender.bind(this),
      onDispose: this.onDispose.bind(this)
    };
  }

  public render(): void {
    if (!this.elem) {
      return;
    }

    this.onRender(this.elem, this.context);
  }

  private onDispose(element: HTMLElement): void {
    ReactDom.unmountComponentAtNode(element);
  }

  private onRender(elem: HTMLElement, context): void {
    if (!this.elem) {
      this.elem = elem;
    }

    // Update hosts store and force property pane update
    this.properties.updateHost(this.targetProperty, elem);
    this.properties.forcePropertyPanePortalUpdate(new Date().toISOString());
  }
}

export function PropertyPaneHost(targetProperty: string, properties): IPropertyPaneField<IPropertyPaneCustomFieldProps> {
  return new PropertyPaneHostBuilder(targetProperty, properties);
}