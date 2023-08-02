import s from './downresume.module.scss';
import Button from '../../../components/UIElements/Button/Button';
import { ReactComponent as DownloadIcon } from '../../../assets/download.svg';
const downresume = () => {

    const resumeLink =
        'https://drive.google.com/file/d/1QXc9BocUHr0DhuKce230B0gQ2xlBDgcJ/view?usp=sharing';
    return (
        <div className={s.container}>
            <Button
                style={{ margin: 'auto', width: '15rem' }}
                className="primary"
                href={resumeLink}
                target="_blank"
            >
                <DownloadIcon fill="#fff" />
                <span className={s.downloadText}> download resume</span>
                <span className={s.filename}>.pdf</span>
            </Button>
        </div>
    );


};

export default downresume;