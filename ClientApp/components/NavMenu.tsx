import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                </div>
                <div className='clearfix'></div>
                <Link className='navbar-brand' to={ '/' }>Recipe Tracker</Link>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/addrecipe' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Add Recipe
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/listrecipes' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> ListRecipes
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
