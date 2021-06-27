import * as React from 'react';

import { ICustomPropertyPaneProps } from './ICustomPropertyPaneProps';

import { PropertyPanePortal } from '../../../PPP/PropertyPanePortal';

import { ListPicker } from '@pnp/spfx-controls-react/lib/ListPicker';
import { ListItemPicker } from '@pnp/spfx-controls-react/lib/ListItemPicker';

import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";

import { WPContext } from './WebPartContext';

export const CustomPropertyPane: React.FunctionComponent<ICustomPropertyPaneProps> = (props) => {

    const wpContext = React.useContext(WPContext);

    // Function to update Web Part properties and re-render the web Part
    function updateWPProperty(p: string, v: any) {
        console.log(v);
        props.propertyBag[p] = v;
        props.renderWP();
    }

    console.log(props.propertyBag);

    return (
        <>
            <PropertyPanePortal propertyPaneHosts={props.propertyPaneHosts}>
                <PeoplePicker
                    data-Property="pnpPeoplePicker"
                    context={wpContext}
                    titleText="PnP People Picker"
                    personSelectionLimit={3}
                    defaultSelectedUsers={props.propertyBag["pnpPeoplePicker"]?.map(user => user.secondaryText)}
                    showtooltip={true}
                    required={false}
                    disabled={false}
                    onChange={(items: any) => updateWPProperty("pnpPeoplePicker", items)}
                    showHiddenInUI={false}
                    principalTypes={[PrincipalType.User]}
                    resolveDelay={1000}
                />
                <ListPicker
                    data-Property="pnpListPicker"
                    context={wpContext}
                    label="PnP List and Item Picker"
                    placeHolder="Select your list(s)"
                    selectedList={props.propertyBag["pnpListPicker"]}
                    baseTemplate={100}
                    includeHidden={false}
                    multiSelect={false}
                    onSelectionChanged={(list: any) => {
                        updateWPProperty("pnpListPicker", list);
                        updateWPProperty("pnpListItemPicker", []);
                    }
                    }
                />
                {(props.propertyBag["pnpListPicker"]) && (props.propertyBag["pnpListPicker"].length == 36) &&
                    <ListItemPicker
                        data-Property="pnpListItemPicker"
                        listId={props.propertyBag["pnpListPicker"]}
                        defaultSelectedItems={props.propertyBag["pnpListItemPicker"]}
                        columnInternalName='Title'
                        keyColumnInternalName='Id'
                        // filter="Title eq 'SPFx'"
                        orderBy={"Id desc"}
                        itemLimit={2}
                        onSelectedItem={(item: any) => updateWPProperty("pnpListItemPicker", item)}
                        context={wpContext}
                    />
                }
            </PropertyPanePortal>
        </>
    );
};