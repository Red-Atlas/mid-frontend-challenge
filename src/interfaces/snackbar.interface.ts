export default interface SnacbkarProps {
    open: boolean;
    message: string;
    severity: Severity;
    autoHideDuration: number,
}

type Severity = 'error' | 'success';
