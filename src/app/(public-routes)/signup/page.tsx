import { Eye, EyeOff, Loader2, MapPin, User, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UseSignup } from '@/app/(public-routes)/signup/hooks';

export default function SignupPage() {
  const {
    isLoading,
    setShowPassword,
    showPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    onSubmit,
    fetchAddressByCep,
    form,
  } = UseSignup();

  return (
    <div className="container flex min-h-screen items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">
            Criar conta
          </CardTitle>
          <CardDescription className="text-center">
            Preencha os dados abaixo para se cadastrar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                          <Input
                            data-testid={'name'}
                            placeholder="Digite seu nome completo"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                          <Input
                            data-testid={'email'}
                            placeholder="seu@email.com"
                            type="email"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                            <Input
                              data-testid={'password-input'}
                              placeholder="******"
                              type={showPassword ? 'text' : 'password'}
                              className="pr-10 pl-10"
                              {...field}
                            />
                            <div className="absolute inset-y-0 right-0">
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="passwordConfirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                            <Input
                              data-testid={'confirm-password'}
                              placeholder="******"
                              type={showConfirmPassword ? 'text' : 'password'}
                              className="pr-10 pl-10"
                              {...field}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-full px-3 py-2"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                    <MapPin className="h-4 w-4" />
                    Endereço
                  </h3>

                  <FormField
                    control={form.control}
                    name="cep"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <Input
                            data-testid={'cep'}
                            placeholder="00000000"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              fetchAddressByCep(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cidade</FormLabel>
                          <FormControl>
                            <Input
                              data-testid={'city'}
                              placeholder="Sua cidade"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <FormControl>
                            <Input
                              data-testid={'state'}
                              placeholder="UF"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <Button
                role={'button'}
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  'Cadastrar'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-muted-foreground text-sm">
            Já possui uma conta?{' '}
            <a
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Faça login
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
