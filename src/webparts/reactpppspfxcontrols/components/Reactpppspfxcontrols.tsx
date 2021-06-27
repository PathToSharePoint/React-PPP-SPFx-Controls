import * as React from 'react';
import styles from './Reactpppspfxcontrols.module.scss';
import { IReactpppspfxcontrolsProps } from './IReactpppspfxcontrolsProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Reactpppspfxcontrols extends React.Component<IReactpppspfxcontrolsProps, {}> {
  public render(): React.ReactElement<IReactpppspfxcontrolsProps> {
    return (
      <div className={ styles.reactpppspfxcontrols }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
            <span className={ styles.title }>Property Pane Portal</span>
              <p className={styles.description}>PnP People Picker: {((this.props.pnpPeoplePicker)&&(this.props.pnpPeoplePicker.length))? this.props.pnpPeoplePicker.map(user => user.text).join("; ") : ""}</p>
              <p className={styles.description}>PnP List Picker: {escape(this.props.pnpListPicker || "")}</p>
              <p className={styles.description}>PnP List Item Picker: {((this.props.pnpListItemPicker)&&(this.props.pnpListItemPicker.length))? this.props.pnpListItemPicker.map(user => user.name).join("; ") : ""}</p>
              <a href="https://pnp.github.io/sp-dev-fx-controls-react" className={ styles.button }>
                <span className={ styles.label }>Visit the PnP SPFx Controls</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
