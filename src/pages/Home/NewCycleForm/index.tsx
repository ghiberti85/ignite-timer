import { FormContainer, TaskInput, MinutesAmountInput } from './styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(1, 'O ciclo precisa ser de no mínimo 1 minutos.')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput 
                id="task" 
                list="task-suggestion"
                placeholder="Dê um nome para o seu projeto"
                disabled={!!activeCycle}
                {...register('task')}
            />

            <datalist id="task-suggestion">
                <option value="Projeto 1"></option>
                <option value="Projeto 2"></option>
                <option value="Projeto 3"></option>
                <option value="Projeto 4"></option>
                <option value="Projeto 5"></option>
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput 
                type="number" 
                id="minutesAmount" 
                placeholder="00"
                step={5}
                min={1}
                max={60}
                disabled={!!activeCycle}
                {...register('minutesAmount', { valueAsNumber: true })}
            />

            <span>minutos.</span>
        </FormContainer>
    )
}