import css from '../styles/NotFound.module.css'

const NotFound = ({ props }) => {
    return (
        <div className={css.NotFound}>
            <span>
                {"oooops there is no such page :("}
            </span>
        </div>
    )
}

export default NotFound; 