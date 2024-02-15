import s from './downresume.module.scss';
import Button from '../../../components/UIElements/Button/Button';
import { ReactComponent as DownloadIcon } from '../../../assets/download.svg';
const downresume = () => {

    const resumeLink =
        'https://rxresu.me/kobruh/kobruh';
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
