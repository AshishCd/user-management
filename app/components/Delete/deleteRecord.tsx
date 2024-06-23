import { IUserData } from "@/app/interfaces/interface";
import styles from "./deleteRecord.module.css";

interface IDeleteRecordsProps {
    record: IUserData | null;
}

export const DeleteRecord: React.FunctionComponent<IDeleteRecordsProps> = ({ record }) => {
    return (
        <div>
            <div className={styles.deleteNotice}>{`Are you sure you want to delete the ${record?.name}`}</div>
        </div>
    )
}