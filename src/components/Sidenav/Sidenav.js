import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import "./Sidenav.css"
import {Link} from 'react-router-dom'

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class TemporaryDrawer extends React.Component {
    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const {classes} = this.props;

        const sideList = (
            <div className={classes.list}>
                <Divider/>
            </div>
        );

        const fullList = (
            <div className={classes.fullList}>
                <Divider/>
            </div>
        );

        return (
            <div>
                <Button id="nav-button" onClick={this.toggleDrawer('right', true)}>
                    <svg width="30" height="30">
                        <path
                            d="M0, 5 30, 5"
                            stroke="#000"
                            stroke-width="5"
                        />
                        <path
                            d="M0, 14 30, 14"
                            stroke="#000"
                            stroke-width="5"
                        />
                        <path
                            d="M0, 23 30, 23"
                            stroke="#000"
                            stroke-width="5"
                        />
                    </svg>
                </Button>
                <Drawer
                    open={this.state.left}
                    onClose={this.toggleDrawer('left', false)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {sideList}
                    </div>
                </Drawer>
                <Drawer
                    anchor="top"
                    open={this.state.top}
                    onClose={this.toggleDrawer('top', false)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('top', false)}
                        onKeyDown={this.toggleDrawer('top', false)}
                    >
                        {fullList}
                    </div>
                </Drawer>
                <Drawer
                    anchor="bottom"
                    open={this.state.bottom}
                    onClose={this.toggleDrawer('bottom', false)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('bottom', false)}
                        onKeyDown={this.toggleDrawer('bottom', false)}
                    >
                        {fullList}
                    </div>
                </Drawer>
                <Drawer
                    anchor="right"
                    open={this.state.right}
                    onClose={this.toggleDrawer('right', false)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('right', false)}
                        onKeyDown={this.toggleDrawer('right', false)}
                    >
                        {sideList}
                    </div>
                    <Button
                        href="#text-buttons"
                        className={classes.button}
                    >
                        <Link
                            to="/"
                            class="side-links"
                        >
                            Home
                        </Link>
                    </Button>
                    <Button
                        href="#text-buttons"
                        className={classes.button}
                    >
                        <Link
                            to="/Profile"
                            class="side-links"
                        >
                            Profile
                        </Link>
                    </Button>
                    <Button
                        href="#text-buttons"
                        className={classes.button}
                    >
                        <Link
                            to="/About"
                            class="side-links"
                        >
                            About
                        </Link>
                    </Button>
                </Drawer>
            </div>
        );
    }
}

TemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);