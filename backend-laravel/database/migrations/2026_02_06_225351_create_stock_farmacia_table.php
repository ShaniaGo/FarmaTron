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
        Schema::create('stock_farmacia', function (Blueprint $table) {
            $table->id();

            // Relaciones
            $table->foreignId('farmacia_id')->constrained('farmacias')->onDelete('cascade');
            $table->foreignId('medicamento_id')->constrained('medicamentos')->onDelete('cascade');

            // Stock
            $table->integer('stock_actual')->default(0);
            $table->integer('stock_minimo')->default(5);

            // Precios
            $table->decimal('precio_venta', 10, 2);
            $table->boolean('disponible')->default(true);

            // Ubicación
            $table->string('ubicacion_estante', 50)->nullable();

            // Promociones
            $table->boolean('promocion')->default(false);
            $table->decimal('descuento_porcentaje', 5, 2)->default(0.00);
            $table->decimal('precio_promocion', 10, 2)->nullable();

            // Timestamps
            $table->timestamp('ultima_actualizacion')->useCurrent()->useCurrentOnUpdate();
            $table->timestamps();

            // Índice único
            $table->unique(['farmacia_id', 'medicamento_id'], 'unique_farmacia_medicamento');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_farmacia');
    }
};
