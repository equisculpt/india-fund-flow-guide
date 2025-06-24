
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useBackupSystem } from '@/hooks/useBackupSystem';
import { 
  Database, 
  Download, 
  Upload, 
  Shield, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Calendar
} from 'lucide-react';

const BackupManagementTab = () => {
  const { status, createFullBackup, createIncrementalBackup, restoreBackup, verifyBackup, fetchBackupLogs } = useBackupSystem();
  const { toast } = useToast();

  useEffect(() => {
    fetchBackupLogs();
  }, [fetchBackupLogs]);

  const handleCreateFullBackup = async () => {
    try {
      await createFullBackup();
    } catch (error) {
      // Error already handled in hook
    }
  };

  const handleCreateIncrementalBackup = async () => {
    try {
      await createIncrementalBackup();
    } catch (error) {
      // Error already handled in hook
    }
  };

  const handleRestoreBackup = async (backupId: string) => {
    if (!confirm(`Are you sure you want to restore backup ${backupId}? This will overwrite current data.`)) {
      return;
    }

    try {
      await restoreBackup(backupId);
    } catch (error) {
      // Error already handled in hook
    }
  };

  const handleVerifyBackup = async (filePath: string) => {
    try {
      await verifyBackup(filePath);
    } catch (error) {
      // Error already handled in hook
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { variant: 'default', label: 'Completed' },
      in_progress: { variant: 'secondary', label: 'In Progress' },
      failed: { variant: 'destructive', label: 'Failed' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.completed;
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  const getBackupTypeBadge = (type: string) => {
    return (
      <Badge variant={type === 'full' ? 'default' : 'outline'}>
        {type === 'full' ? 'Full' : 'Incremental'}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Backup & Recovery</h2>
          <p className="text-muted-foreground">Protect your critical data with automated backups</p>
        </div>
        <Button onClick={fetchBackupLogs} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Security Alert */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Data Protection:</strong> All backups are encrypted and stored securely. Regular backups ensure your KYC data, 
          portfolio information, and user data are protected against data loss, corruption, or security incidents.
        </AlertDescription>
      </Alert>

      {/* Backup Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Full Backup
            </CardTitle>
            <CardDescription>
              Complete backup of all critical data including KYC, portfolios, and user information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleCreateFullBackup} 
              disabled={status.isLoading}
              className="w-full"
            >
              {status.isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Creating Backup...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Create Full Backup
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Incremental Backup
            </CardTitle>
            <CardDescription>
              Backup only data that has changed since the last backup
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleCreateIncrementalBackup} 
              disabled={status.isLoading}
              variant="outline"
              className="w-full"
            >
              {status.isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Creating Backup...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Create Incremental Backup
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Last Backup Status */}
      {status.lastBackup && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Last Backup Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Backup ID</p>
                <p className="font-mono text-sm">{status.lastBackup.backup_id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                {getBackupTypeBadge(status.lastBackup.backup_type)}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                {getStatusBadge(status.lastBackup.status)}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="text-sm">{new Date(status.lastBackup.created_at).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Backup History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Backup History
          </CardTitle>
          <CardDescription>
            View and manage your backup history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Backup ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {status.backups.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No backups found. Create your first backup to get started.
                  </TableCell>
                </TableRow>
              ) : (
                status.backups.map((backup) => (
                  <TableRow key={backup.backup_id}>
                    <TableCell className="font-mono text-sm">{backup.backup_id}</TableCell>
                    <TableCell>{getBackupTypeBadge(backup.backup_type)}</TableCell>
                    <TableCell>{getStatusBadge(backup.status)}</TableCell>
                    <TableCell>{new Date(backup.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{backup.total_records || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVerifyBackup(backup.file_path)}
                          disabled={status.isLoading}
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRestoreBackup(backup.backup_id)}
                          disabled={status.isLoading || backup.status !== 'completed'}
                        >
                          <Upload className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Data Protection Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Data Protection Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>• <strong>Regular Backups:</strong> Schedule weekly full backups and daily incremental backups</p>
            <p>• <strong>Verify Backups:</strong> Regularly test backup integrity and restoration procedures</p>
            <p>• <strong>Multiple Locations:</strong> Store backups in different geographic locations</p>
            <p>• <strong>Encryption:</strong> All backups are encrypted with industry-standard encryption</p>
            <p>• <strong>Access Control:</strong> Only authorized personnel can create or restore backups</p>
            <p>• <strong>Retention Policy:</strong> Maintain backups for at least 7 years for compliance</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackupManagementTab;
