import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneHorizontalRule,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReactpppspfxcontrolsWebPartStrings';
import Reactpppspfxcontrols from './components/Reactpppspfxcontrols';
import { IReactpppspfxcontrolsProps } from './components/IReactpppspfxcontrolsProps';
import { CustomPropertyPane } from './components/CustomPropertyPane';
import { IPropertyPaneHostsProps, PropertyPaneHostsFactory } from '../../PPP/PropertyPaneHostsStore';
import { PropertyPaneHost } from '../../PPP/PropertyPaneHost';

import { WPContext } from './components/WebPartContext';

export interface IReactpppspfxcontrolsWebPartProps {
  description: string;
  pnpListPicker: string;
  pnpListItemPicker: any[];
  pnpPeoplePicker: any[];
}

export default class ReactpppspfxcontrolsWebPart extends BaseClientSideWebPart<IReactpppspfxcontrolsWebPartProps> {

  public render(): void {

    ReactDom.render(
      <>
        {/* Web Part content */}
        < Reactpppspfxcontrols {...this.properties} />
        {/* Property Pane custom controls */}
        <WPContext.Provider value={this.context}>
        < CustomPropertyPane
          propertyBag={this.properties}
          renderWP={this.render.bind(this)}
          propertyPaneHosts={this.propertyPaneHosts}
        />
        </WPContext.Provider>
      </>,
      this.domElement);
  }

  // Store for managing the Property Pane hosts
  public propertyPaneHosts: IPropertyPaneHostsProps = PropertyPaneHostsFactory();

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneHorizontalRule(),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneHorizontalRule()
              ]
            },
            {
              groupName: strings.PnPSPFxControlsGroup,
              groupFields: [
                // PropertyPaneHost is a generic control that hosts the actual control
                PropertyPaneHorizontalRule(),
                PropertyPaneHost('pnpPeoplePicker', this.propertyPaneHosts),
                PropertyPaneHorizontalRule(),
                PropertyPaneHost('pnpListPicker', this.propertyPaneHosts),
                PropertyPaneHost('pnpListItemPicker', this.propertyPaneHosts),
                PropertyPaneHorizontalRule(),
              ]
            }
          ]
        }
      ]
    };
  }
}
