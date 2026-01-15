# Deployment Guide - Seal Explorer Hub

## ✅ Estado Actual del Proyecto

El proyecto está **completamente configurado** para deployment automático. Sin embargo, **GitHub Pages necesita ser activado manualmente** en la configuración del repositorio.

### 🔧 Configuración Completada

- ✅ GitHub Actions workflow (`.github/workflows/deploy.yml`)
- ✅ Vite configurado correctamente para GitHub Pages
- ✅ CNAME file para dominio personalizado (todofocas.com)
- ✅ Build optimizado y testeado
- ✅ Seguridad revisada y configurada

### ⚠️ Pendiente: Activar GitHub Pages (Acción Manual Requerida)

## 📋 Pasos para Activar el Sitio Web

### Paso 1: Activar GitHub Pages

1. Ve a tu repositorio en GitHub:
   ```
   https://github.com/Maurox058/seal-explorer-hub
   ```

2. Click en **Settings** (Configuración) en la parte superior

3. En el menú lateral izquierdo, busca y click en **Pages**

4. En la sección "Source" (Fuente):
   - Selecciona: **"GitHub Actions"**
   - ⚠️ NO selecciones "Deploy from a branch"

5. Click en **Save**

6. ✅ **¡Listo!** El workflow se ejecutará automáticamente

### Paso 2: Verificar el Deployment

Después de activar Pages:

1. Ve a la pestaña **Actions** en tu repositorio

2. Verás el workflow "Deploy to GitHub Pages" ejecutándose

3. Espera a que termine (toma 1-2 minutos)

4. Tu sitio estará disponible en:
   ```
   https://maurox058.github.io/seal-explorer-hub/
   ```

### Paso 3: Configurar Dominio Personalizado (Opcional)

Si deseas usar **todofocas.com**:

1. En Settings → Pages (misma página que el Paso 1)

2. En la sección "Custom domain":
   - Ingresa: `todofocas.com`
   - Click en **Save**

3. Configura tu DNS:
   - Ve a tu proveedor de DNS (donde compraste el dominio)
   - Crea un registro CNAME:
     - **Tipo**: CNAME
     - **Nombre**: `@` o `www`
     - **Valor**: `maurox058.github.io`

4. Espera propagación DNS (puede tomar 24-48 horas)

5. En Settings → Pages, marca **"Enforce HTTPS"** (recomendado)

## 🔄 Deployments Automáticos

Una vez configurado GitHub Pages, los deployments serán **completamente automáticos**:

- ✅ Cada push a `main` desplegará automáticamente
- ✅ No necesitas hacer nada más
- ✅ El sitio se actualizará en 1-2 minutos después de cada commit

## 🐛 Troubleshooting

### Error 404 "There isn't a GitHub Pages site here"

**Causa**: GitHub Pages no está activado en Settings.

**Solución**: Completa el **Paso 1** de esta guía.

### Workflow con estado "action_required"

**Causa**: GitHub Pages está esperando que actives Pages en Settings.

**Solución**: Completa el **Paso 1** de esta guía.

### El sitio no se actualiza después de un commit

**Causa**: El workflow puede estar fallando.

**Solución**: 
1. Ve a Actions en GitHub
2. Click en el workflow más reciente
3. Revisa los logs para ver el error
4. Si no encuentras el problema, reporta el error con los logs

### Dominio personalizado no funciona

**Causa**: DNS no está configurado correctamente.

**Solución**:
1. Verifica que el CNAME en DNS apunta a `maurox058.github.io`
2. Espera 24-48 horas para propagación DNS
3. Verifica la configuración en Settings → Pages

## 📝 Comandos de Build Local

Para testear localmente antes de desplegar:

```bash
# Instalar dependencias
npm install

# Build de producción
npm run build

# Preview del build
npm run preview
```

## 🔐 Seguridad

El repositorio está configurado con:

- ✅ Permisos mínimos en workflows (read-only content, write pages)
- ✅ `.gitignore` configurado para excluir archivos sensibles
- ✅ No hay secrets ni credenciales en el código
- ✅ HTTPS enforcement disponible para dominio personalizado

## 📚 Recursos Adicionales

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Documentation](https://vitejs.dev/)

## ✨ Resultado Final

Una vez completados todos los pasos:

- 🌐 Sitio web accesible públicamente
- 🚀 Deployments automáticos con cada commit
- 🔒 HTTPS habilitado
- 🎨 Build optimizado y comprimido
- ⚡ Carga rápida (<200ms)

---

**¿Preguntas?** Comenta en el PR o crea un issue en el repositorio.
