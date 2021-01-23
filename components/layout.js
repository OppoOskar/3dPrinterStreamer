import style from '../styles/layout.module.sass'

export default function Layout({ children }) {
    return (
        <div>
            <div id="state_border_color" className={style.content}>
                <div className={style.navBar}>
                    <ul id="state_background_color">
                        <li>
                            <a href="/">
                                Stream
                            </a>
                        </li>
                        <li>
                            <a href="/timelapses">
                                Timelapses
                            </a>
                        </li>
                    </ul>
                </div>    
                {children}
            </div>
            
        </div>)
}