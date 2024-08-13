import React from 'react';
import { Menu, Input, Dropdown, Button, Container } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import '../css/Header.css'; // Hover durumları için ek CSS dosyası

const Header = () => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/login');
    };

    const clothingOptions = [
        { key: 'shorts', text: 'Shorts', value: 'shorts' },
        { key: 'tshirt', text: 'T-Shirt', value: 'tshirt' },
        { key: 'pants', text: 'Pants', value: 'pants' },
        { key: 'jacket', text: 'Jacket', value: 'jacket' }
    ];

    const electronicOptions = [
        { key: 'cellphone', text: 'CellPhone', value: 'cellphone' },
        { key: 'laptop', text: 'Laptop', value: 'laptop' },
        { key: 'tablet', text: 'Tablet', value: 'tablet' }
    ];

    const bookOptions = [
        { key: 'novel', text: 'Novel', value: 'novel' },
        { key: 'story', text: 'Story', value: 'story' },
        { key: 'biography', text: 'Biography', value: 'biography' },
        { key: 'magazine', text: 'Magazine', value: 'magazine' },
        { key: 'education', text: 'Education', value: 'education' }
    ];

    return (
        <div>
            <Menu inverted attached="top">
                <Container>
                    <Menu.Item header>Company Name</Menu.Item>
                    <Menu.Item style={{ flexGrow: 1 }}>
                        <Input
                            icon="search"
                            placeholder="Search..."
                            style={{ width: '100%' }}
                        />
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Button primary onClick={handleProfileClick}>
                                Profile
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
            <Menu inverted attached="bottom">
                <Container>
                    <Dropdown item text="Clothing" className="hover-dropdown">
                        <Dropdown.Menu>
                            {clothingOptions.map((option) => (
                                <Dropdown.Item className='item' key={option.key} text={option.text} />
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown item text="Electronic" className="hover-dropdown">
                        <Dropdown.Menu>
                            {electronicOptions.map((option) => (
                                <Dropdown.Item className='item' key={option.key} text={option.text} />
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown item text="Book" className="hover-dropdown">
                        <Dropdown.Menu>
                            {bookOptions.map((option) => (
                                <Dropdown.Item className='item' key={option.key} text={option.text} />
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Menu>
        </div>
    );
};

export default Header;
