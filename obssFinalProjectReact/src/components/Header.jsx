import React from 'react';
import { Menu, Input, Dropdown, Button, Container } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import '../css/Header.css'; // Hover durumları için ek CSS dosyası

const Header = () => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/login');
    };

    const handleCategoryClick = (category) => {
        navigate(`/?category=${category}`);
    };

    const handleTypeByCategoryClick = (category, type) => {
        navigate(`/?category=${category}&type=${type}`);
    };

    const handleNameClick = () => {
        navigate(`/`);
    }

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
                    <Menu.Item header onClick={handleNameClick}>Company Name</Menu.Item>
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
                    <Dropdown item text="Clothing" className="hover-dropdown" onClick={() => handleCategoryClick('clothing')}>
                        <Dropdown.Menu>
                            {clothingOptions.map((option) => (
                                <Dropdown.Item
                                key={option.key}
                                onClick={(e) => {
                                    e.stopPropagation(); // Üst öğeye olan tıklama olayını durdurur
                                    handleTypeByCategoryClick('clothing', option.value);
                                    console.log('Category:', "clothing");
                                    console.log('Type:', option.value);
                                }}
                            >
                                {option.text}
                            </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown item text="Electronic" className="hover-dropdown" onClick={() => handleCategoryClick('electronics')}>
                        <Dropdown.Menu>
                            {electronicOptions.map((option) => (
                                <Dropdown.Item
                                key={option.key}
                                onClick={(e) => {
                                    e.stopPropagation(); // Üst öğeye olan tıklama olayını durdurur
                                    handleTypeByCategoryClick('electronics', option.value);
                                    console.log('Category:', "elec");
                                    console.log('Type:', option.value);
                                }}
                            >
                                {option.text}
                            </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown item text="Book" className="hover-dropdown" onClick={() => handleCategoryClick('books')}>
                        <Dropdown.Menu>
                            {bookOptions.map((option) => (
                                <Dropdown.Item
                                key={option.key}
                                onClick={(e) => {
                                    e.stopPropagation(); // Üst öğeye olan tıklama olayını durdurur
                                    handleTypeByCategoryClick('books', option.value);
                                    console.log('Category:', "book");
                                    console.log('Type:', option.value);
                                }}
                            >
                                {option.text}
                            </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Menu>
        </div>
    );
};

export default Header;
