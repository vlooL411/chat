import { ReactElement } from "react"
import style from "./changeThemes.module.sass";
import { ThemeContext, Themes } from "../../pages/_app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";

type Props = {
    className?: string
}

const ChangeThemes = ({ className = '' }: Props): ReactElement => {
    const { changetheme } = style

    return <ThemeContext.Consumer>
        {({ theme, toggleThemes }) =>
            <button className={`${changetheme} ${className}`}
                onClick={() => toggleThemes(theme == Themes.light ? Themes.dark : Themes.light)}>
                <FontAwesomeIcon icon={faSun} />
            </button>
        }
    </ThemeContext.Consumer>
}

export default ChangeThemes
