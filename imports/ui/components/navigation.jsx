import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { List, ListItem } from 'material-ui/List'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import { capitalize } from 'lodash'
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import { UserMenu } from './user_menu'
import { organizationsForUser } from '../../api/users/users'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
const sectionUrl = (organizationId, section) => FlowRouter.path(section, { organizationId })

const styles = {
  appbar: {
    zIndex: 10000
  },
  drawer: {
    top: '56px'
  }
}
export class Navigation extends Component {
  constructor(props) {
    super(props)

    this.handleCloseDrawer = this.handleCloseDrawer.bind(this)
    this.handleOpenDrawer = this.handleOpenDrawer.bind(this)

    this.state = {
      open: true
    }
  }

  handleOpenDrawer() {
    this.setState({ open: true })
  }
  handleCloseDrawer() {
    this.setState({ open: false })
  }

  render() {
    const { organizationId, title, sections, user, organizations, backToSection} = this.props
    const { open } = this.state

    // const iconElementRight = (
    //   <FlatButton
    //     style={styles.avatarButton}
    //     children={[<Avatar size={avatarSize}>A</Avatar>]}
    //   />
    // )

    return (
      <div>
        <Drawer
          open={open}
          containerStyle={styles.drawer}
          docked={true}
          onRequestChange={(open) => this.setState({ open })}
        >
          <List>
            { sections.map((section) => (
              <ListItem
                key={section}
                primaryText={capitalize(section)}
                onTouchTap={() => FlowRouter.go(sectionUrl(organizationId, section))}
              />
            ))}
            <Divider />
            <ListItem
              key='switch'
              primaryText='Go to texter'
              onTouchTap={() => FlowRouter.go('/text')}
            />
          </List>

        </Drawer>
        <AppBar
          style={styles.appbar}
          iconElementLeft={backToSection ? (
            <IconButton onTouchTap={ () => FlowRouter.go(sectionUrl(organizationId, backToSection)) }>
              <ArrowBackIcon />
            </IconButton>
          ) : <div />}
          // onLeftIconButtonTouchTap={ this.handleOpenDrawer }
          title={title}
          iconElementRight={<UserMenu user={Meteor.user()} organizations={organizationsForUser(Meteor.user())} />}
        />
      </div>
    )
  }
}

export const AdminNavigation = ({ backToSection, organizationId, title }) => (
  <Navigation
    title={title}
    organizationId={organizationId}
    backToSection={backToSection}
    sections={['campaigns', 'texters', 'optouts']}
  />
)

export const AppNavigation = ({ backToSection, organizationId, title }) => (
  <Navigation
    organizationId={organizationId}
    title={title}
    backToSection={backToSection}
    sections={['todos', 'assignments', 'messages']}
  />
)