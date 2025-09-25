import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const { t } = useTranslation();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'learner' as 'architect' | 'learner'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - in real app, this would call an API
    const user = {
      id: Date.now().toString(),
      name: isLoginMode ? 'John Doe' : formData.name,
      email: isLoginMode ? 'john@example.com' : formData.email,
      role: isLoginMode ? 'learner' : formData.role
    };
    
    onLogin(user);
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'learner'
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'learner'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>👤</span>
            {isLoginMode ? t('authModal.welcomeBack') : t('authModal.joinCommunity')}
          </DialogTitle>
          <DialogDescription>
            {isLoginMode 
              ? t('authModal.loginPrompt')
              : t('authModal.createAccountPrompt')
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <div className="space-y-2">
              <Label htmlFor="name">{t('authModal.fullName')}</Label>
              <Input
                id="name"
                type="text"
                placeholder={t('authModal.placeholderFullName')}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
              <Label htmlFor="email">{t('authModal.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('authModal.placeholderEmail')}
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
              <Label htmlFor="password">{t('authModal.password')}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t('authModal.placeholderPassword')}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
            />
          </div>

          {!isLoginMode && (
            <div className="space-y-3">
                  <Label>{t('authModal.iAmA')}</Label>
              <RadioGroup 
                value={formData.role} 
                onValueChange={(value: string) => handleInputChange('role', value)}
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="learner" id="learner" />
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-blue-500">📖</span>
                    <div>
                      <Label htmlFor="learner" className="font-medium cursor-pointer">
                        {t('authModal.roleLearner')}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {t('authModal.roleLearnerDescription')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="architect" id="architect" />
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-green-500">👥</span>
                    <div>
                      <Label htmlFor="architect" className="font-medium cursor-pointer">
                        {t('authModal.roleArchitect')}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {t('authModal.roleArchitectDescription')}
                      </p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>
          )}

          <Button type="submit" className="w-full">
            {isLoginMode ? t('authModal.login') : t('authModal.createAccount')}
          </Button>
        </form>

        <Separator />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {isLoginMode ? t('authModal.dontHaveAccount') : t('authModal.alreadyHaveAccount')}
          </p>
          <Button variant="link" onClick={switchMode} className="p-0 h-auto">
            {isLoginMode ? t('authModal.createOneHere') : t('authModal.loginHere')}
          </Button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-800">
            <strong>{t('authModal.demoNoteLabel', 'Demo Note:')}</strong> {t('authModal.demoNote')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}