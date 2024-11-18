import Image from 'next/image';  // Import Image from next/image
import './topbar.css';  // Import your CSS
import { Search } from './svg';
import Link from 'next/link';

export default function TopBar() {

    return (
        <main>
            <div className="topbar-cont">
                <div className="ayuraksha-logo-cont">
                    <Image
                        src="/ayuraksha-logo-full.svg"  // Ensure the correct path
                        alt="Ayuraksha Logo"
                        height={80}  // Numeric values for height
                        width={300}   // Numeric values for width
                        priority
                        className="ayuraksha-logo"
                    />
                </div>
                <div className='topbar-input-and-icon'>
                    <input type="text" name="searchText" className='topbar-input' placeholder='Search'/>
                    <div className="topbar-search" >
                        <Search />
                    </div>
                </div>
                    <Link href={'/login'} className='topbar-button'>Login</Link>
                    <Link href={'/register'} className='topbar-button'>Sign Up</Link>
            </div>
        </main>
    );
}
