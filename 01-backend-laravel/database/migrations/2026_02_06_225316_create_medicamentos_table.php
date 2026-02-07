<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('medicamentos', function (Blueprint $table) {
            $table->id();
            $table->string('codigo_barras', 50)->nullable()->unique();
            $table->string('nombre_comercial', 150);
            $table->string('nombre_generico', 150)->nullable();
            $table->text('descripcion')->nullable();
            $table->string('fabricante', 100)->nullable();

            // Categorización
            $table->foreignId('categoria_id')->nullable()->constrained('categoria_medicamentos')->onDelete('set null');
            $table->string('subcategoria', 100)->nullable();

            // Presentación
            $table->enum('forma_farmaceutica', [
                'tableta', 'capsula', 'jarabe', 'inyectable', 'crema',
                'ungüento', 'supositorio', 'gotas', 'inhalador', 'parche', 'otro', 'tableta efervescente',
                'unidad', 'gel'
            ]);
            $table->string('concentracion', 100)->nullable();
            $table->string('contenido', 100)->nullable();

            // Control
            $table->boolean('requiere_receta')->default(false);
            $table->boolean('controlado')->default(false);
            $table->date('fecha_vencimiento')->nullable();

            // Precio y stock
            $table->decimal('precio_referencia', 10, 2);
            $table->decimal('precio_regular', 10, 2)->nullable();
            $table->string('imagen_url')->nullable();

            // Estado
            $table->boolean('activo')->default(true);
            $table->timestamp('fecha_creacion')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicamentos');
    }
};
