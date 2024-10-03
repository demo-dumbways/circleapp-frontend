import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import store from '@/redux/index.ts'
import circleTheme from './themes/theme.ts'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const quaeryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={quaeryClient}>
            <Provider store={store}>
                <ChakraProvider theme={circleTheme}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ChakraProvider>
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
)
