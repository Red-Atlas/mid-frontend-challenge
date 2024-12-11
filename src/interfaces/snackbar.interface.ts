type Severity = 'error' | 'success';

export default interface SnacbkarProps {
    open: boolean;
    message: string;
    severity: Severity
}

