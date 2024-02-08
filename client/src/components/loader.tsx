import Spinner from 'react-bootstrap/Spinner';

const Loader = ({ active }: { active: boolean }): JSX.Element => {
    if (!active) {
        return <></>;
    }
    return (
        <div id="overlay">
            <Spinner animation='grow' />
        </div>
    )
}

export default Loader;