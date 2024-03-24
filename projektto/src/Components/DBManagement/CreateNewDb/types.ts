export interface CreateNewDbProps {
  dbName: string;
  setDbName: React.Dispatch<React.SetStateAction<string>>;
  showDbName: boolean;
  setShowDbName: React.Dispatch<React.SetStateAction<boolean>>;
}